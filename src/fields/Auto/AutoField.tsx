import invariant from "invariant"
import {createAutoField} from "uniforms"
import {
    BoolField,
    DateField,
    DateIntervalField,
    ListField,
    NestField,
    NumField,
    RadioField,
    SelectField,
    TextField
} from "../"


export type AutoFieldProps = Parameters<typeof AutoField>[0];
export type AutoField = ReturnType<typeof createAutoField>

export const AutoField = createAutoField(props => {
    if (props.allowedValues) {
        return props.checkboxes && props.fieldType !== Array
            ? RadioField
            : SelectField
    }

    switch (props.fieldType) {
        case Array:
            return ListField
        case Boolean:
            return BoolField
        case Date:
            return DateField
        case Number:
            return NumField
        case Object:
            return NestField
        case String:
            if (props?.field?.format && props.field.format === "date-time-interval") {
                return DateIntervalField
            }
            return TextField
    }

    return invariant(false, "Unsupported field type: %s", props.fieldType)
})

