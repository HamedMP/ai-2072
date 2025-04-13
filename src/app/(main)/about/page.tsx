import { MDXRemote } from 'next-mdx-remote/rsc';
import { promises as fs } from 'fs';
import path from 'path';
import { D3Component } from '@/components/charts/sample-d3-chart';
import { ChartComponentSample } from '@/components/my-chart';

export default async function ProjectPage() {
  const content = await fs.readFile(
    path.join(process.cwd(), 'src', 'content', 'about.mdx'),
    'utf-8',
  );
  return (
    <div>
      <MDXRemote source={content} components={{ D3Component, ChartComponentSample }} />
    </div>
  );
}
