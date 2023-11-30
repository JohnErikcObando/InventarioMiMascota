-- FUNCTION: public.t_producto_historial()

-- DROP FUNCTION IF EXISTS public.t_producto_historial();

CREATE OR REPLACE FUNCTION public.t_producto_historial()
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
    modulo := 'Producto';

    IF TG_OP = 'INSERT' THEN
        campo := 'Nuevo Producto';
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
        IF NEW.marca_id <> OLD.marca_id THEN
            campo := 'marca_id';
            nuevo := NEW.marca_id::TEXT;
            anterior := OLD.marca_id::TEXT;
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

        IF NEW.categoria_id <> OLD.categoria_id THEN
            campo := 'categoria_id';
            nuevo := NEW.categoria_id::TEXT;
            anterior := OLD.categoria_id::TEXT;
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

        IF NEW.codigo <> OLD.codigo THEN
            campo := 'codigo';
            nuevo := NEW.codigo;
            anterior := OLD.codigo;
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
        
        IF NEW.valor <> OLD.valor THEN
            campo := 'valor';
            nuevo := NEW.valor;
            anterior := OLD.valor;
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
        
        IF NEW.imagen_url <> OLD.imagen_url THEN
            campo := 'imagen_url';
            nuevo := NEW.imagen_url;
            anterior := OLD.imagen_url;
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
        campo := 'Eliminar Producto';
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

ALTER FUNCTION public.t_producto_historial()
    OWNER TO "MiMascota";


-- Trigger: t_producto_historial

-- DROP TRIGGER IF EXISTS t_producto_historial ON public.productos;

CREATE OR REPLACE TRIGGER t_producto_historial
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.productos
    FOR EACH ROW
    EXECUTE FUNCTION public.t_producto_historial();    
