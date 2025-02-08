DROP INDEX IF EXISTS idx_class_unique_name;
CREATE INDEX idx_class_unique_name ON obj.class (tenant_id, UPPER(name));

DROP INDEX IF EXISTS idx_property_unique_name;
CREATE UNIQUE INDEX idx_property_unique_name ON obj.property (tenant_id, UPPER(name));

DROP INDEX IF EXISTS idx_class_property_class;
DROP INDEX IF EXISTS idx_class_property_property;
CREATE INDEX idx_class_property_class ON obj.class_property (class_id);
CREATE INDEX idx_class_property_property ON obj.class_property (property_id);

DROP INDEX IF EXISTS idx_instance_data_instance;
DROP INDEX IF EXISTS idx_instance_data_action;
CREATE INDEX idx_instance_data_instance ON obj.instance_data(instance_id);
CREATE INDEX idx_instance_data_action ON obj.instance_data(instance_id, instance_action);

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

-- Improves lookups for the current data instance record
ALTER TABLE obj.instance_current ADD PRIMARY KEY (instance_id);

