-- This stored procedure is used to check enforcement on the obj.class_property table during
-- an insert or update for values.  This checks that the class_id and property_id from the
-- obj.class and obj.property tables match the tenant_id for each, enforcing tenancy
-- records, while keeping the database clean.

CREATE OR REPLACE FUNCTION enforce_class_property_tenant()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT tenant_id FROM obj.class WHERE id = NEW.class_id) !=
       (SELECT tenant_id FROM obj.property WHERE id = NEW.property_id) THEN
        RAISE EXCEPTION 'Class and Property must belong to the same tenant';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_class_property_tenant
    BEFORE INSERT OR UPDATE ON obj.class_property
    FOR EACH ROW EXECUTE FUNCTION enforce_class_property_tenant();
