-- Generate a log to store information about benchmarks for each action performed.
DROP TABLE IF EXISTS obj.system_log CASCADE;

CREATE TABLE obj.system_log (
    log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID,                        -- Generic identifier for the target object or entity (optional)
    source_table VARCHAR(255),             -- Name of the table being referenced (if applicable)
    procedure_name VARCHAR(100) NOT NULL,  -- Name of the stored procedure or process
    action VARCHAR(50) NOT NULL,           -- Action performed (e.g., 'created', 'updated', 'deleted', etc.)
    message TEXT NOT NULL,                 -- Detailed log message
    user_id UUID,                          -- ID of the user who initiated the action (if applicable)
    execution_time INTERVAL,               -- Duration taken by the process, for benchmarking
    log_timestamp TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()  -- Time of the log entry
);
