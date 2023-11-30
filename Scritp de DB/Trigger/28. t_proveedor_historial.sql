-- FUNCTION: public.t_proveedor_historial()

-- DROP FUNCTION IF EXISTS public.t_proveedor_historial();

CREATE OR REPLACE FUNCTION public.t_proveedor_historial()
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
    modulo := 'Proveedor';

    IF TG_OP = 'INSERT' THEN
        campo := 'Nuevo Proveedor';
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
		 IF NEW.id <> OLD.id THEN
            campo := 'id';
            nuevo := NEW.id::TEXT;
            anterior := OLD.id::TEXT;
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

        IF NEW.activo <> OLD.activo THEN
            campo := 'activo';
            nuevo := NEW.activo::TEXT;
            anterior := OLD.activo::TEXT;
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
        campo := 'Eliminar Proveedor';
        nuevo := '';
        anterior := OLD.nombre;
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

ALTER FUNCTION public.t_proveedor_historial()
    OWNER TO "MiMascota";



-- Trigger: t_proveedor_historial

-- DROP TRIGGER IF EXISTS t_proveedor_historial ON public.proveedores;

CREATE OR REPLACE TRIGGER t_proveedor_historial
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.proveedores
    FOR EACH ROW
    EXECUTE FUNCTION public.t_proveedor_historial();