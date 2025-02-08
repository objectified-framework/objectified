CREATE OR REPLACE FUNCTION obj.validate_and_update_instance_data()
RETURNS TRIGGER AS $$
DECLARE
schema_def JSONB;
    current_data JSONB;
    validation_result BOOLEAN;
    start_time TIMESTAMP := clock_timestamp();
    end_time TIMESTAMP;
    exec_duration INTERVAL;
BEGIN
    -- Log the start of the procedure
INSERT INTO obj.system_log (
    source_id, source_table, procedure_name, action, message, log_timestamp
)
VALUES (
           NEW.instance_id,
           'obj.instance_data',
           'validate_and_update_instance_data',
           'start',
           'Procedure execution started.',
           NOW()
       );

-- Retrieve the JSON Schema for the instance's class
SELECT schema INTO schema_def
FROM obj.class_schema
WHERE class_id = (SELECT class_id FROM obj.instance WHERE id = NEW.instance_id);

IF schema_def IS NULL THEN
        INSERT INTO obj.system_log (
            source_id, source_table, procedure_name, action, message, log_timestamp
        )
        VALUES (
            NEW.instance_id,
            'obj.class_schema',
            'validate_and_update_instance_data',
            'error',
            'No schema found for instance ID.',
            NOW()
        );
        RAISE EXCEPTION 'No schema found for instance ID: %', NEW.instance_id;
END IF;

    -- Use a CASE statement to handle the various instance_action values.
CASE NEW.instance_action
        WHEN 'created' THEN
            -- Validate the new data for a "created" action
SELECT jsonb_schema_valid(schema_def, NEW.data) INTO validation_result;
IF NOT validation_result THEN
                INSERT INTO obj.system_log (
                    source_id, source_table, procedure_name, action, message, log_timestamp
                )
                VALUES (
                    NEW.instance_id,
                    'obj.instance_current',
                    'validate_and_update_instance_data',
                    'error',
                    'Validation failed for created data.',
                    NOW()
                );
                RAISE EXCEPTION 'Validation failed for created data for instance ID: %', NEW.instance_id;
END IF;
INSERT INTO obj.instance_current (instance_id, instance_data)
VALUES (NEW.instance_id, NEW.data)
    ON CONFLICT (instance_id) DO UPDATE SET instance_data = EXCLUDED.instance_data;
INSERT INTO obj.system_log (
    source_id, source_table, procedure_name, action, message, log_timestamp
)
VALUES (
           NEW.instance_id,
           'obj.instance_current',
           'validate_and_update_instance_data',
           'created',
           'Data inserted/updated in instance_current for created action.',
           NOW()
       );
WHEN 'updated' THEN
SELECT instance_data INTO current_data
FROM obj.instance_current
WHERE instance_id = NEW.instance_id;
IF current_data IS NULL THEN
                INSERT INTO obj.system_log (
                    source_id, source_table, procedure_name, action, message, log_timestamp
                )
                VALUES (
                    NEW.instance_id,
                    'obj.instance_current',
                    'validate_and_update_instance_data',
                    'error',
                    'No existing data found for update.',
                    NOW()
                );
                RAISE EXCEPTION 'No existing instance data found for update: %', NEW.instance_id;
END IF;
            -- Merge new data with existing data (delta computation)
            NEW.data := jsonb_strip_nulls(current_data || NEW.data);
SELECT jsonb_schema_valid(schema_def, NEW.data) INTO validation_result;
IF NOT validation_result THEN
                INSERT INTO obj.system_log (
                    source_id, source_table, procedure_name, action, message, log_timestamp
                )
                VALUES (
                    NEW.instance_id,
                    'obj.instance_current',
                    'validate_and_update_instance_data',
                    'error',
                    'Validation failed for updated data.',
                    NOW()
                );
                RAISE EXCEPTION 'Updated instance data does not conform to schema for instance ID: %', NEW.instance_id;
END IF;
UPDATE obj.instance_current
SET instance_data = NEW.data
WHERE instance_id = NEW.instance_id;
INSERT INTO obj.system_log (
    source_id, source_table, procedure_name, action, message, log_timestamp
)
VALUES (
           NEW.instance_id,
           'obj.instance_current',
           'validate_and_update_instance_data',
           'updated',
           'Data updated in instance_current for updated action.',
           NOW()
       );
WHEN 'deleted' THEN
SELECT instance_data INTO current_data
FROM obj.instance_current
WHERE instance_id = NEW.instance_id;
IF current_data IS NULL THEN
                INSERT INTO obj.system_log (
                    source_id, source_table, procedure_name, action, message, log_timestamp
                )
                VALUES (
                    NEW.instance_id,
                    'obj.instance_current',
                    'validate_and_update_instance_data',
                    'error',
                    'No existing data found for deletion.',
                    NOW()
                );
                RAISE EXCEPTION 'No existing instance data found for deletion: %', NEW.instance_id;
END IF;
INSERT INTO obj.instance_data (instance_id, instance_action, instance_date, data)
VALUES (NEW.instance_id, 'deleted', NOW(), current_data);
DELETE FROM obj.instance_current
WHERE instance_id = NEW.instance_id;
INSERT INTO obj.system_log (
    source_id, source_table, procedure_name, action, message, log_timestamp
)
VALUES (
           NEW.instance_id,
           'obj.instance_current',
           'validate_and_update_instance_data',
           'deleted',
           'Data archived and deleted from instance_current.',
           NOW()
       );
WHEN 'restored' THEN
SELECT data INTO current_data
FROM obj.instance_data
WHERE instance_id = NEW.instance_id
  AND instance_action = 'deleted'
ORDER BY instance_date DESC
    LIMIT 1;
IF current_data IS NULL THEN
                INSERT INTO obj.system_log (
                    source_id, source_table, procedure_name, action, message, log_timestamp
                )
                VALUES (
                    NEW.instance_id,
                    'obj.instance_data',
                    'validate_and_update_instance_data',
                    'error',
                    'No deleted data found for restore.',
                    NOW()
                );
                RAISE EXCEPTION 'No deleted instance data found for restore: %', NEW.instance_id;
END IF;
SELECT jsonb_schema_valid(schema_def, current_data) INTO validation_result;
IF NOT validation_result THEN
                INSERT INTO obj.system_log (
                    source_id, source_table, procedure_name, action, message, log_timestamp
                )
                VALUES (
                    NEW.instance_id,
                    'obj.instance_current',
                    'validate_and_update_instance_data',
                    'error',
                    'Validation failed for restored data.',
                    NOW()
                );
                RAISE EXCEPTION 'Restored instance data does not conform to schema for instance ID: %', NEW.instance_id;
END IF;
INSERT INTO obj.instance_current (instance_id, instance_data)
VALUES (NEW.instance_id, current_data)
    ON CONFLICT (instance_id) DO UPDATE SET instance_data = EXCLUDED.instance_data;
INSERT INTO obj.system_log (
    source_id, source_table, procedure_name, action, message, log_timestamp
)
VALUES (
           NEW.instance_id,
           'obj.instance_current',
           'validate_and_update_instance_data',
           'restored',
           'Data restored into instance_current from archived deleted data.',
           NOW()
       );
ELSE
            INSERT INTO obj.system_log (
                source_id, source_table, procedure_name, action, message, log_timestamp
            )
            VALUES (
                NEW.instance_id,
                'unknown',
                'validate_and_update_instance_data',
                'error',
                'Unrecognized instance_action: ' || NEW.instance_action,
                NOW()
            );
            RAISE EXCEPTION 'Unrecognized instance_action: %', NEW.instance_action;
END CASE;

    end_time := clock_timestamp();
    exec_duration := end_time - start_time;

    -- Log procedure completion with execution time
INSERT INTO obj.system_log (
    source_id, source_table, procedure_name, action, message, execution_time, log_timestamp
)
VALUES (
           NEW.instance_id,
           'validate_and_update_instance_data',
           'validate_and_update_instance_data',
           'finish',
           'Procedure executed successfully.',
           exec_duration,
           NOW()
       );

RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validate_instance_data
    BEFORE INSERT OR UPDATE ON obj.instance_data
    FOR EACH ROW
    EXECUTE FUNCTION obj.validate_and_update_instance_data();
