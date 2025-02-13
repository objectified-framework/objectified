ALTER TABLE obj.property
ADD COLUMN IF NOT EXISTS class_id UUID REFERENCES obj.class(id);

ALTER TABLE obj.property DROP CONSTRAINT IF EXISTS chk_property_field_or_class;

ALTER TABLE obj.property
ADD CONSTRAINT chk_property_field_or_class
CHECK (
    (field_id IS NOT NULL AND class_id IS NULL) OR
    (field_id IS NULL AND class_id IS NOT NULL)
);

