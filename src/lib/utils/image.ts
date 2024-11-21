export function getImageUrl(path: string | null | undefined): string {
  if (!path) return '/images/placeholder.jpg';
  
  // If the path is already a full URL, return it
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // If the path starts with /images/, it's a local public image
  if (path.startsWith('/images/')) {
    return path;
  }

  // Otherwise, construct the Supabase storage URL
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    console.error('NEXT_PUBLIC_SUPABASE_URL is not defined');
    return '/images/placeholder.jpg';
  }

  // Remove any leading slash from the path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${supabaseUrl}/storage/v1/object/public/images/${cleanPath}`;
}
