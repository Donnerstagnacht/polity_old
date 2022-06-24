REVOKE ALL ON TABLE public."following_profile_system" FROM authenticated;
REVOKE ALL ON TABLE public."following_profile_system" FROM postgres;
REVOKE ALL ON TABLE public."following_profile_system" FROM service_role;
GRANT ALL ON TABLE public."following_profile_system" TO authenticated;

GRANT ALL ON TABLE public."following_profile_system" TO service_role;

GRANT ALL ON TABLE public."following_profile_system" TO postgres;

REVOKE ALL ON TABLE public."following_group_system" FROM authenticated;
REVOKE ALL ON TABLE public."following_group_system" FROM postgres;
REVOKE ALL ON TABLE public."following_group_system" FROM service_role;
GRANT ALL ON TABLE public."following_group_system" TO authenticated;

GRANT ALL ON TABLE public."following_group_system" TO service_role;

GRANT ALL ON TABLE public."following_group_system" TO postgres;

REVOKE ALL ON TABLE public.group_members FROM authenticated;
REVOKE ALL ON TABLE public.group_members FROM postgres;
REVOKE ALL ON TABLE public.group_members FROM service_role;
GRANT ALL ON TABLE public.group_members TO authenticated;

GRANT ALL ON TABLE public.group_members TO service_role;

GRANT ALL ON TABLE public.group_members TO postgres;
