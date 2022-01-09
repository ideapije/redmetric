import React from 'react'
import { useForm } from '@inertiajs/inertia-react'
import { Button } from '@chakra-ui/react'

export default function Uploader({ url, type = 'idcard' }) {
    const { data, setData, post, progress } = useForm({
        type: type,
        document: null,
    })

    function submit(e) {
        e.preventDefault()
        post(url)
    }
    return (
        <form onSubmit={submit} encType="multipart/form-data">
            <input type="hidden" value={data.type} onChange={e => setData('type', e.target.value)} />
            <input type="file" onChange={e => setData('document', e.target.files[0])} />
            {progress && (
                <progress value={progress.percentage} max="100">
                    {progress.percentage}%
                </progress>
            )}
            <Button colorScheme="red" type="submit">Upload</Button>
        </form>
    )
}
