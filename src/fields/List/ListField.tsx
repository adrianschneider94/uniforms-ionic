import React, {Children, cloneElement, isValidElement} from "react"
import {connectField, HTMLFieldProps} from "uniforms"

import {IonLabel, IonListHeader} from "@ionic/react"
import {createListItemField, ListItemField} from "./ListItemField"
import {createListAddField} from "./ListAddField"
import {AutoField} from "../Auto/AutoField"

export type ListFieldProps = HTMLFieldProps<unknown[],
    HTMLUListElement,
    {initialCount?: number; itemProps?: object}>;

export function createListField(AutoField: AutoField) {
    let ListAddField = createListAddField(AutoField)
    let ListItemField = createListItemField(AutoField)


    function List({
                      children = <ListItemField name="$"/>,
                      initialCount,
                      itemProps,
                      label,
                      value,
                      ...props
                  }: ListFieldProps) {
        return (
            <>
                <IonListHeader style={{paddingRight: 4}}>
                    <IonLabel>
                        {label}
                    </IonLabel>
                    <ListAddField initialCount={initialCount} name="$"/>
                </IonListHeader>
                <div style={{paddingLeft: 22}}>
                    {value?.map((item, itemIndex) =>
                        Children.map(children, (child, childIndex) => {
                                if (isValidElement(child)) {
                                    return cloneElement(child, {
                                        key: `${itemIndex}-${childIndex}`,
                                        name: child.props.name?.replace("$", "" + itemIndex), ...itemProps
                                    })
                                } else {
                                    return child
                                }
                            }
                        )
                    )}
                </div>
            </>
        )
    }

    return connectField(List)
}


export const ListField = createListField(AutoField)