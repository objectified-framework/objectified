ALTER TABLE obj.api_key
ADD COLUMN tenant_id UUID NOT NULL REFERENCES obj.tenant(id);
