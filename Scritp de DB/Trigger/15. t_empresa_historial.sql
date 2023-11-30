-- FUNCTION: public.t_empresa_historial()

-- DROP FUNCTION IF EXISTS public.t_empresa_historial();

CREATE OR REPLACE FUNCTION public.t_empresa_historial()
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
    modulo := 'Empresa';

    IF TG_OP = 'INSERT' THEN
        campo := 'Nueva Empresa';
        nuevo := NEW.nombre;
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
        IF NEW.nombre <> OLD.nombre THEN
            campo := 'nombre';
            nuevo := NEW.nombre;
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

        IF NEW.direccion <> OLD.direccion THEN
            campo := 'direccion';
            nuevo := NEW.direccion;
            anterior := OLD.direccion;
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

        IF NEW.telefono <> OLD.telefono THEN
            campo := 'telefono';
            nuevo := NEW.telefono;
            anterior := OLD.telefono;
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

        IF NEW.celular <> OLD.celular THEN
            campo := 'celular';
            nuevo := NEW.celular;
            anterior := OLD.celular;
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

        IF NEW.logo <> OLD.logo THEN
            campo := 'logo';
            nuevo := NEW.logo;
            anterior := OLD.logo;
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
            nuevo := NEW.email;
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

    ELSIF TG_OP = 'DELETE' THEN
        campo := 'Eliminar Empresa';
        nuevo := OLD.nombre;
        anterior := '';
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

ALTER FUNCTION public.t_empresa_historial()
    OWNER TO "MiMascota";


-- Trigger: t_empresa_historial

-- DROP TRIGGER IF EXISTS t_empresa_historial ON public.empresas;

CREATE OR REPLACE TRIGGER t_empresa_historial
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.empresas
    FOR EACH ROW
    EXECUTE FUNCTION public.t_empresa_historial();