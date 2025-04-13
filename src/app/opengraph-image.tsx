import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Image metadata
export const alt = 'AI 2072';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  const etBook = await readFile(
    join(
      process.cwd(),
      'src/styles/fonts/et-book/et-book-bold-line-figures/et-book-bold-line-figures.ttf',
    ),
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fffff8',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            fontSize: 128,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'ET Book',
          }}
        >
          AI 2072
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'ET Book',
          data: etBook,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
}
