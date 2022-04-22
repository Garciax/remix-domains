import qs from 'qs'

const inputFromSearch = (queryString: URLSearchParams) =>
  qs.parse(queryString.toString())

const inputFromFormData = (formData: FormData) =>
  inputFromSearch(
    new URLSearchParams(formData.entries() as unknown as URLSearchParams),
  )

const inputFromForm = async (request: Request) =>
  inputFromFormData(await request.clone().formData())

const inputFromUrl = (request: Request) =>
  inputFromSearch(new URL(request.url).searchParams)

export { inputFromForm, inputFromUrl, inputFromFormData, inputFromSearch }
