--diable row level security for testing without taking user roles into account
ALTER TABLE following_group_system DISABLE ROW LEVEL SECURITY;
ALTER TABLE following_profile_system DISABLE ROW LEVEL SECURITY;
ALTER TABLE group_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE groups DISABLE ROW LEVEL SECURITY;
ALTER TABLE membership_requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE notifications_of_groups DISABLE ROW LEVEL SECURITY;
ALTER TABLE notifications_of_user DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE rooms DISABLE ROW LEVEL SECURITY;
ALTER TABLE rooms_messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE rooms_participants DISABLE ROW LEVEL SECURITY;
ALTER TABLE push_notifications DISABLE ROW LEVEL SECURITY;