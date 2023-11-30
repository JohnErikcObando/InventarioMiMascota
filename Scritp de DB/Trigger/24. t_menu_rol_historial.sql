-- FUNCTION: public.t_menu_rol_historial()

-- DROP FUNCTION IF EXISTS public.t_menu_rol_historial();

CREATE OR REPLACE FUNCTION public.t_menu_rol_historial()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
    campo VARCHAR;
    nuevo VARCHAR;
    anterior VARCHAR;
    modulo VARCHAR;
    accion VARCHAR;
BEGIN
    modulo := 'MenuRol';

    IF TG_OP = 'INSERT' THEN
        campo := 'Nuevo Menú-Rol';
        nuevo := NEW.id::TEXT;
        anterior := '';
        accion := 'Ingreso';
        CALL p_ingresar_historial(
            NEW.usuario_modif,
            campo,
            modulo,
            NEW.id::TEXT,
            nuevo,
            anterior,
            accion
        );
		
	 ELSIF TG_OP = 'UPDATE' THEN
        accion := 'Actualizar';

        -- Verificar cada campo individualmente y registrar cambios
        IF NEW.menu_id <> OLD.menu_id THEN
            campo := 'menu_id';
            nuevo := NEW.menu_id;
            anterior := OLD.menu_id;
            CALL p_ingresar_historial(
                NEW.usuario_modif,
                campo,
                modulo,
                NEW.id::TEXT, 
                nuevo,
                anterior,
                accion
            );
        END IF;	
		
		IF NEW.rol_usuario_id <> OLD.rol_usuario_id THEN
            campo := 'rol_usuario_id';
            nuevo := NEW.rol_usuario_id;
            anterior := OLD.rol_usuario_id;
            CALL p_ingresar_historial(
                NEW.usuario_modif,
                campo,
                modulo,
                NEW.id::TEXT, 
                nuevo,
                anterior,
                accion
            );
        END IF;	

    ELSIF TG_OP = 'DELETE' THEN
        campo := 'Eliminar Menú-Rol';
        nuevo := '';
        anterior := NEW.id::TEXT;
        accion := 'Eliminar';
        CALL p_ingresar_historial(
            OLD.usuario_modif,
            campo,
            modulo,
            OLD.id::TEXT, 
            nuevo,
            anterior,
            accion
        );
    END IF;

    RETURN NULL;
END;
$BODY$;

ALTER FUNCTION public.t_menu_rol_historial()
    OWNER TO "MiMascota";


-- Trigger: t_menu_rol_historial

-- DROP TRIGGER IF EXISTS t_menu_rol_historial ON public.menu_rols;

CREATE OR REPLACE TRIGGER t_menu_rol_historial
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.menu_rols
    FOR EACH ROW
    EXECUTE FUNCTION public.t_menu_rol_historial();
