-- #144: Adds support for email user/pass login

ALTER TYPE obj_user_source ADD VALUE 'credentials';
ALTER TABLE obj.user ADD COLUMN password VARCHAR(200);
