-- FUNCTION: public.t_categoria_historial()

-- DROP FUNCTION IF EXISTS public.t_categoria_historial();

CREATE OR REPLACE FUNCTION public.t_categoria_historial()
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
    modulo := 'Categoria';

    IF TG_OP = 'INSERT' THEN
        campo := 'Nueva Categoria';
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

        IF NEW.descripcion <> OLD.descripcion THEN
            campo := 'descripcion';
            nuevo := NEW.descripcion;
            anterior := OLD.descripcion;
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
        campo := 'Eliminar Categoria';
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

ALTER FUNCTION public.t_categoria_historial()
    OWNER TO "MiMascota";


-- Trigger: t_categoria_historial

-- DROP TRIGGER IF EXISTS t_categoria_historial ON public.categorias;

CREATE OR REPLACE TRIGGER t_categoria_historial
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.categorias
    FOR EACH ROW
    EXECUTE FUNCTION public.t_categoria_historial();