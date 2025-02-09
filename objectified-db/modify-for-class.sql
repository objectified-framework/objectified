-- This script modifies the tables to support the ability to store a class as a data type for referencing.

ALTER TABLE obj.class_property
 ADD COLUMN IF NOT EXISTS child_class_id UUID REFERENCES obj.class(id);

-- Mutual exclusivity check: property id or class id can be set, but not both.
ALTER TABLE obj.class_property DROP CONSTRAINT IF EXISTS check_class_property_reference;
ALTER TABLE obj.class_property
  ADD CONSTRAINT check_class_property_reference
CHECK (
    (property_id IS NOT NULL AND child_class_id IS NULL)
    OR (property_id IS NULL AND child_class_id IS NOT NULL)
);

