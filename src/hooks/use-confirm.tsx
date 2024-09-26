/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

export const useConfirm = (title: string, message: string): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{resolve: (value: boolean) => void} | null>(null)
    const confirm = () => new Promise((resolve, reject) => {
        setPromise({resolve})
    })

    const handleClose = () => {
        setPromise(null)
    }  
    
    const handleCancel = () => {
        promise?.resolve(false)
        handleClose()
    }

    const handleConfrim = () => {
        promise?.resolve(true)
        handleClose()
    }

    const confirmDialog = () => (
        <Dialog open={promise !== null}>
            <DialogContent className="bg-white text-black">
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {message}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="pt-2">
                    <Button onClick={handleCancel} variant={"outline"}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfrim}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

    return[confirmDialog, confirm]
}