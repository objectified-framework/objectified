-- This function is called to perform instance_data functions when data is inserted into the instance_data
-- table.  The different functions performed against the instance_data and instance_current tables will
-- depend on the action specified in the instance_action record.  Those actions are commented in detail
-- in the validate_and_update_instance_data function.

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

    -- If no schema definition was found, it means the class is either empty, or no class_property
    -- records have been added.  This is a protection mechanism that prevents data from being
    -- inserted into a table without a valid schema for validation.
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

    CASE NEW.instance_action
        -- When an instance_action is set to "created", the following actions take place:
        --
        -- Validation is performed against the instance record being inserted.  If validation fails,
        -- the object will not be inserted, and a validation exception will be raised.
        --
        -- If the object validates, the instance_current table will be replaced with the instance
        -- data being inserted, and the embedding column will be set to null.
        WHEN 'created' THEN
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

        -- When instance_action is "updated", the following actions take place:
        --
        -- The function will check to see if current data already exists in the instance_current table,
        -- which must be used for comparison when an update is performed.  If the data does not exist,
        -- then the "updated" function will not work, throwing an exception.
        --
        -- After the instance data is retrieved, the data update will be applied to the data set using a
        -- delta operator.
        --
        -- Once the data is updated, the record will be saved back to the instance_current table,
        -- representing the current table data after changes.
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

        -- When the "instance_action" is "deleted", these are the actions that take place:
        --
        -- First, the instance data is copied from instance_current into a temporary storage
        -- variable, if there is data in the instance_current table.  If not, an exception is
        -- thrown.
        --
        -- Once retrieved, the data is copied to the instance_data's "data" table, which stores
        -- a copy of the data after deletion.
        --
        -- The instance_current table record that contains the record will be deleted after the
        -- data has been copied to the instance_data record.  This is so the record can be
        -- restored if desired.
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

        -- When the "instance_action" is "restored", the actions are as follows:
        --
        -- The last record in the database that was "deleted" will be retrieved, and the instance data will
        -- be retrieved from the record.  If there is no deleted record in the database, an exception will
        -- be raised.
        --
        -- As long as the restored data record matches the class_schema table for validation, the record
        -- will be re-inserted into the database, and the action recorded in the instance_data table will
        -- be set to "restored" state.
        WHEN 'restored' THEN
            SELECT data INTO current_data
            FROM obj.instance_data
            WHERE instance_id = NEW.instance_id
              AND instance_action = 'deleted'
            ORDER BY instance_date DESC LIMIT 1;

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

        -- Otherwise, if the specified action doesn't exist, or a new instance_action was specified,
        -- an exception is thrown.
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

DROP TRIGGER IF EXISTS trigger_validate_instance_data ON obj.instance_data;

CREATE TRIGGER trigger_validate_instance_data
    BEFORE INSERT OR UPDATE ON obj.instance_data
    FOR EACH ROW
    EXECUTE FUNCTION obj.validate_and_update_instance_data();
