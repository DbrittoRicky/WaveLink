/* eslint-disable @typescript-eslint/no-unused-vars */
import Quill, { type QuillOptions } from "quill"
import {MdSend} from "react-icons/md"
import "quill/dist/quill.snow.css"
import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import {PiTextAa} from "react-icons/pi"
import { ImageIcon, SendHorizonalIcon, Smile } from "lucide-react"
import { Hint } from "./hint"
import { Delta, Op } from "quill/core"

type EditorValue = {
    image: File | null;
    body: string;
}

interface EditorProps {
    onSubmit: ({image, body}: EditorValue) => void;
    onCancel?: () => void;
    placeholder?: string;
    defaultValue?: Delta | Op[];
    disabled?: boolean;
    innerRef?: MutableRefObject<Quill | null> 
    variant?: "create" | "update";
}

const Editor = ({
    variant = "create",
    onSubmit,
    onCancel,
    placeholder = "Start writing...",
    defaultValue = [],
    disabled = false,
    innerRef,
}: EditorProps) => {
    const [text, setText] = useState("")

    const containerRef = useRef<HTMLDivElement>(null)
    const submitRef = useRef(onSubmit)
    const placeholderRef = useRef(placeholder)
    const quillRef = useRef<Quill | null>(null)
    const defaultValueRef = useRef(defaultValue)
    const disabledRef = useRef(disabled)

    useLayoutEffect(() => {
        submitRef.current = onSubmit;
        placeholderRef.current = placeholder;
        defaultValueRef.current = defaultValue;
        disabledRef.current = disabled;
    })

    useEffect(() => {
        if(!containerRef.current) return;

        const container = containerRef.current;
        const editorContainer = container.appendChild(
            container.ownerDocument.createElement("div")
        )

        const options: QuillOptions =  {
            theme: "snow",
            placeholder: placeholderRef.current,

        }

        const quill = new Quill(editorContainer, options)
        quillRef.current = quill
        quillRef.current.focus()

        if(innerRef) { 
            innerRef.current = quill
        }

        quill.setContents(defaultValueRef.current)
        setText(quill.getText())

        quill.on(Quill.events.TEXT_CHANGE, () => {
            setText(quill.getText())
        })

        return () => {
            quill.off(Quill.events.TEXT_CHANGE)
            if(container) {
                container.innerHTML = ""
            }
            if(quillRef.current) {
                quillRef.current = null
            }
            if(innerRef) {
                innerRef.current = null
            }
        }
    }, [innerRef])

    const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

  return (
    <div className='flex flex-col'>
        <div className='flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white'>
            <div ref={containerRef} className="h-full ql-custom"/>
            <div className="flex px-2 pb-2 z-[5]">
                <Hint label="Hide Formatting">
                <Button disabled={false} size={"iconSm"} variant={"ghost"} onClick={() => {}}>
                    <PiTextAa className="size-4"/>
                </Button>
                </Hint>
                <Hint label="Emojis">
                <Button disabled={false} size={"iconSm"} variant={"ghost"} onClick={() => {}}>
                    <Smile className="size-4"/>
                </Button>
                </Hint>
                {variant === "create" && (
                    <Hint label="Image">
                    <Button disabled={false} size={"iconSm"} variant={"ghost"} onClick={() => {}}>
                        <ImageIcon className="size-4"/>
                    </Button>
                    </Hint>
                )}

                {variant === "update" && (
                    <div className="ml-auto flex items-center gap-x-2">
                        <Button variant={"outline"} size={"sm"} onClick={() => {}} disabled={false}>
                            Cancel
                        </Button>
                        <Button size={"sm"} onClick={() => {}} disabled={false} className="bg-[#2c889f] hover:bg-[#2c889f]/80">
                            Save
                        </Button>
                    </div>
                )}
                {variant === "create" && (
                <Button className="ml-auto bg-[#2c889f] hover:bg-[#2c889f]/80" size={"iconSm"} disabled={false} onClick={() => {}}>
                    <MdSend className="size-4"/>
                </Button>
                )}
                
            </div>
        </div>
        <div className="p-2 text-[13px] flex justify-end">
            <p className="text-muted-foreground">
                <strong>Shift + Return</strong> to add a new line
            </p>
        </div>
    </div>
  )
}

export default Editor