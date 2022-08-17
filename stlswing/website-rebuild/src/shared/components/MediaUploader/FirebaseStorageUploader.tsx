import {
  deleteObject,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage'
import { MediaUploader, MediaUploaderProps } from './MediaUploader'

const storage = getStorage()

export const FirebaseStorageUploader = (
  props: Omit<MediaUploaderProps, 'onDelete' | 'onUpload'>
) => {
  return (
    <MediaUploader
      onDelete={(file) => {
        const fileRef = ref(storage, file.filename)
        deleteObject(fileRef)
      }}
      onUpload={async (source, progress) => {
        const fileRef = ref(storage, source.name)
        const uploadTask = uploadBytesResumable(fileRef, source)

        uploadTask.on('state_changed', (snapshot) => {
          if (!progress) return
          progress(true, snapshot.bytesTransferred, snapshot.totalBytes)
        })

        return uploadTask
          .then((response) => response.ref.name)
          .catch((err) => err.message) as Promise<string>
      }}
      {...props}
    />
  )
}
