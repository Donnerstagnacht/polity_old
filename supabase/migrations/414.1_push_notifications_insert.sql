DROP function if exists insert_into_push_notifications(
    endpoint_in text, 
    expiration_time_in text, 
    p256dh_in text, 
    auth_in text,
    user_id_in uuid
);
create or replace function insert_into_push_notifications(
    endpoint_in text, 
    expiration_time_in text, 
    p256dh_in text, 
    auth_in text,
    user_id_in uuid
)
returns void
language plpgsql
security definer
as
$$
BEGIN
    INSERT INTO "push_notifications" (
        endpoint, 
        expiration_time, 
        p256dh, 
        auth,
        user_id 
    )
    VALUES (
        endpoint_in, 
        expiration_time_in, 
        p256dh_in, 
        auth_in,
        user_id_in 
    );
END;
$$;