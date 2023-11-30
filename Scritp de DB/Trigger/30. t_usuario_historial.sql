-- FUNCTION: public.t_usuario_historial()

-- DROP FUNCTION IF EXISTS public.t_usuario_historial();

CREATE OR REPLACE FUNCTION public.t_usuario_historial()
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
    modulo := 'Usuario';

    IF TG_OP = 'INSERT' THEN
        campo := 'Nuevo Usuario';
        nuevo := NEW.usuario;
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
		
        IF NEW.usuario <> OLD.usuario THEN
            campo := 'usuario';
            nuevo := NEW.usuario;
            anterior := OLD.usuario;
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

        IF NEW.password <> OLD.password THEN
            campo := 'password';
            nuevo := '********'; -- Opcional: puedes decidir no registrar contraseñas
            anterior := '********';
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

        IF NEW.nombre <> OLD.nombre THEN
            campo := 'nombre';
            nuevo :=NEW.nombre ; 
            anterior := OLD.nombre;
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
		
		IF NEW.apellido <> OLD.apellido THEN
            campo := 'apellido';
            nuevo :=NEW.apellido ; 
            anterior := OLD.apellido;
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
		
		IF NEW.email <> OLD.email THEN
            campo := 'email';
            nuevo :=NEW.email ; 
            anterior := OLD.email;
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
		
		IF NEW.activo <> OLD.activo THEN
            campo := 'activo';
            nuevo :=NEW.activo ; 
            anterior := OLD.activo;
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
        campo := 'Eliminar Usuario';
        nuevo := '';
        anterior := OLD.usuario;
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

ALTER FUNCTION public.t_usuario_historial()
    OWNER TO "MiMascota";



-- Trigger: t_usuario_historial

-- DROP TRIGGER IF EXISTS t_usuario_historial ON public.usuarios;

CREATE OR REPLACE TRIGGER t_usuario_historial
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.usuarios
    FOR EACH ROW
    EXECUTE FUNCTION public.t_usuario_historial();
