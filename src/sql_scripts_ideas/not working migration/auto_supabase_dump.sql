REVOKE ALL ON TABLE public."following-profile-system" FROM authenticated;
REVOKE ALL ON TABLE public."following-profile-system" FROM postgres;
REVOKE ALL ON TABLE public."following-profile-system" FROM service_role;
GRANT ALL ON TABLE public."following-profile-system" TO authenticated;

GRANT ALL ON TABLE public."following-profile-system" TO service_role;

GRANT ALL ON TABLE public."following-profile-system" TO postgres;

REVOKE ALL ON TABLE public."following-group-system" FROM authenticated;
REVOKE ALL ON TABLE public."following-group-system" FROM postgres;
REVOKE ALL ON TABLE public."following-group-system" FROM service_role;
GRANT ALL ON TABLE public."following-group-system" TO authenticated;

GRANT ALL ON TABLE public."following-group-system" TO service_role;

GRANT ALL ON TABLE public."following-group-system" TO postgres;

REVOKE ALL ON TABLE public.group_members FROM authenticated;
REVOKE ALL ON TABLE public.group_members FROM postgres;
REVOKE ALL ON TABLE public.group_members FROM service_role;
GRANT ALL ON TABLE public.group_members TO authenticated;

GRANT ALL ON TABLE public.group_members TO service_role;

GRANT ALL ON TABLE public.group_members TO postgres;
