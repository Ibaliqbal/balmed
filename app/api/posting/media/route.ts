import { getUser } from "@/utils/getUser";
import { getUrlFile, uploadFile } from "@/lib/supabase/service";
import { User } from "@/types/user.type";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const file = body.get("file") as File;
  const bucketName = body.get("bucketName") as string;
  console.log(body.get("bucketName"));
  console.log(body.get("file"));
  const user = (await getUser()) as User;
  const formatFile = file.type.split("/")[1];
  if (user) {
    const res = await uploadFile(
      bucketName,
      file,
      `${user.id}/${crypto.randomUUID()}.${formatFile}`
    );
    if (!res) return null;
    const url = await getUrlFile(res.data?.path as string, "posting");

    return NextResponse.json(
      {
        status: true,
        statusCode: 201,
        url: url.publicUrl,
        path: res.data?.path,
      },
      {
        status: 201,
      }
    );
  } else {
    return NextResponse.json(
      { status: false, statusCode: 400 },
      {
        status: 400,
      }
    );
  }
}
