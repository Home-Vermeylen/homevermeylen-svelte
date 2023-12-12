import type { ZodError, ZodSchema } from 'zod';

export const serializeNonPOJOs = (obj: object) => {
	return structuredClone(obj);
};

export const getImageURL = (
	collectionId: string,
	recordId: string,
	filename: string,
	size = '0x0'
) => {
	return `${
		import.meta.env.VITE_PUBLIC_POCKETBASE_URL
	}/api/files/${collectionId}/${recordId}/${filename}?thumb=${size}`;
};

export const valideerData = async (formData: FormData, schema: ZodSchema) => {
	const body = Object.fromEntries(formData);

	try {
		const data = schema.parse(body);

		return {
			formData: data,
			errors: null
		};
	} catch (err: any) {
		const errors = err.flatten();

		return {
			formData: body,
			errors
		};
	}
};
