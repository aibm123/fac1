from datetime import datetime, timedelta
from airflow import DAG
from airflow.providers.postgres.operators.postgres import PostgresOperator

default_args = {
    "owner": "data-eng",
    "retries": 1,
    "retry_delay": timedelta(minutes=5),
}

with DAG(
    "metrics_from_kafka_to_postgres",
    default_args=default_args,
    description="Ingest metrics from Kafka topic into Postgres",
    schedule=timedelta(minutes=10),
    start_date=datetime(2025, 1, 1),
    catchup=False,
    tags=["kafka","postgres"],
) as dag:
    # In a real deployment, use a KafkaHook/consumer task. Here we assume data lands in a staging table.
    create_staging = PostgresOperator(
        task_id="create_staging",
        postgres_conn_id="metrics_db",
        sql="""
        create table if not exists metrics_staging (ts timestamptz, value double precision);
        """
    )
    upsert = PostgresOperator(
        task_id="upsert_prod",
        postgres_conn_id="metrics_db",
        sql="""
        insert into metrics(ts, value)
        select ts, value from metrics_staging
        on conflict (ts) do update set value=excluded.value;
        truncate table metrics_staging;
        """
    )
    create_staging >> upsert
