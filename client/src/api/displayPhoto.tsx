import { stringType } from 'aws-sdk/clients/iam';

export async function uploadDisplayPhoto(
  file: any,
  type: string,
  mediaCategory: string,
  token: string,
  apiUrl: string
): Promise<void> {
  await fetch(apiUrl + 'media/displayPhoto', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        mediaCategory,
        file,
        fileType: type,
      },
    }),
  });
}

export async function deleteDisplayPhoto(
  token: string,
  apiUrl: stringType
): Promise<void> {
  await fetch(apiUrl + 'media/displayPhoto', {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function getOwnDisplayPhoto(
  token: string,
  apiUrl: stringType
): Promise<void> {
  const res = await fetch(apiUrl + 'media/displayPhoto', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  console.log(JSON.stringify(data));

  return data['data'];
}
