-- Enforce tenancy on instance insertion
CREATE OR REPLACE FUNCTION enforce_instance_tenancy()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM obj.tenant_user tu
        JOIN obj.class c ON tu.tenant_id = c.tenant_id
        WHERE tu.user_id = NEW.owner_id
        AND c.id = NEW.class_id
    ) THEN
        RAISE EXCEPTION 'User does not have access to this class''s tenant';
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_enforce_instance_tenancy ON obj.instance;
CREATE TRIGGER trg_enforce_instance_tenancy
    BEFORE INSERT OR UPDATE ON obj.instance
    FOR EACH ROW EXECUTE FUNCTION enforce_instance_tenancy();

