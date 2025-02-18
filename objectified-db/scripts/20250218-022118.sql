DROP TABLE IF EXISTS obj.api_key;

CREATE TABLE obj.api_key (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES obj.user(id),
    name VARCHAR(80) NOT NULL,
    address_pattern VARCHAR(255) NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    create_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    access_date TIMESTAMP WITHOUT TIME ZONE,
    expire_date TIMESTAMP WITHOUT TIME ZONE,
    access_count INTEGER,
    max_access_count INTEGER DEFAULT 100,
    UNIQUE (user_id, name)
);

CREATE OR REPLACE FUNCTION reset_api_key_access_count()
RETURNS void AS $$
BEGIN
    UPDATE obj.api_key
    SET access_count = 0
    WHERE enabled = TRUE;  -- Optionally add conditions, e.g., only reset for active keys
END;
$$ LANGUAGE plpgsql;

DO $$
    BEGIN
        BEGIN
        -- Try to create the extension
        CREATE EXTENSION IF NOT EXISTS pg_cron;
    EXCEPTION
        WHEN OTHERS THEN
            -- If any error occurs (e.g., extension not found), just ignore it
            RAISE NOTICE 'Extension creation failed or extension already exists for ''pg_cron''. Ignoring.';
    END;
END $$;

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
	SELECT cron.schedule('0 * * * *', 'SELECT reset_api_key_access_count();');
    ELSE
        RAISE NOTICE 'pg_cron does not exist, skipping - you really should install it.';
    END IF;
END $$;

