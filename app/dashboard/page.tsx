import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default async function DashboardMainPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    redirect('/login');
  }

  let userRole = 'TENANT';

  try {
    const decodedToken = jwt.decode(token) as JwtPayload;
    if (decodedToken?.role) {
      userRole = decodedToken.role;
    }
  } catch (error) {
    redirect('/login');
  }

  if (userRole === 'ADMIN') {
    redirect('/dashboard/admin');
  } else if (userRole === 'LANDLORD') {
    redirect('/dashboard/landlord');
  } else {
    redirect('/dashboard/tenant');
  }
}