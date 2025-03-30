CREATE TYPE obj_user_access AS ENUM ('free', 'subscription');

ALTER TABLE obj.user
ADD access obj_user_access[];

UPDATE obj.user SET access = '{free}' WHERE access IS NULL;
