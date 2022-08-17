// Filepond CSS
import 'filepond-plugin-get-file/dist/filepond-plugin-get-file.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond-plugin-media-preview/dist/filepond-plugin-media-preview.min.css'
import 'filepond/dist/filepond.min.css'

import { FilePond, registerPlugin } from 'react-filepond'

// Filepond Plugins
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginMediaPreview from 'filepond-plugin-media-preview'
import { FilePondFile } from 'filepond'
import FilePondPluginGetFile from 'filepond-plugin-get-file'

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginMediaPreview,
  FilePondPluginGetFile
)

type fileTypes = '.jpg' | '.gif' | '.png' | '.mp4' | 'webp' | 'webm'

export type MediaUploaderProps = {
  files?: File[]
  fieldName: string
  baseFilePath?: `/${string}`
  maxFiles?: number
  multiple?: boolean
  showPreview?: boolean
  required?: boolean
  disabled?: boolean
  acceptedFileTypes?: fileTypes[]
  onDelete: (file: FilePondFile) => void
  onUpload: (
    sourceFile: File,
    progress?: (
      showInfinite: boolean,
      bytesTransferred: number,
      totalToTransfer: number
    ) => void
  ) => Promise<string>
}

export const MediaUploader = (props: MediaUploaderProps) => {
  return (
    <FilePond
      allowMultiple={props.multiple}
      allowImagePreview={props.showPreview}
      onprocessfilerevert={props.onDelete}
      server={{
        process: (
          inputFieldName,
          fileObject,
          metadata,
          load,
          error,
          progress // Sets progress of upload
        ) => {
          props
            .onUpload(
              // @ts-ignore => the original type for `fileObject` is 'ActualFileObject' from FilePond.  They have stated that this is deprecated, but haven't changed their typings yet.
              fileObject,
              progress
            )
            .then(load)
            .catch(error)
        }
      }}
      allowReorder
      required={props.required}
      disabled={props.disabled}
      maxFiles={props.multiple ? props.maxFiles || 10 : null}
      name={props.fieldName}
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      // @ts-ignore
      credits={false}
    />
  )
}
