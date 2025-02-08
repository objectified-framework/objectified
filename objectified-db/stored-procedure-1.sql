-- Review
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

CREATE TRIGGER trg_class_property_tenant
    BEFORE INSERT OR UPDATE ON obj.class_property
    FOR EACH ROW EXECUTE FUNCTION enforce_class_property_tenant();

