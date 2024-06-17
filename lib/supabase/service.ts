import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "./init";

export async function retriveData<T>(tableName: string): Promise<T[] | null> {
  const { data, error } = await supabase.from(tableName).select();

  if (error) {
    return null;
  } else {
    return data;
  }
}

export async function retriveDataByColumn<T>(
  tableName: string,
  selectCol: string,
  valCol: string
): Promise<T[] | null> {
  const { data, error } = await supabase
    .from(tableName)
    .select()
    .eq(selectCol, valCol);
  if (error) {
    return null;
  } else {
    return data;
  }
}

export async function retriveSingleData<T>(
  tableName: string,
  selectColumn: string,
  valueCol: string
): Promise<T | null> {
  const { data, error } = await supabase
    .from(tableName)
    .select()
    .eq(selectColumn, valueCol)
    .single();

  if (error) {
    return null;
  } else {
    return data;
  }
}

export async function insertData<TData>(
  tableName: string,
  data: TData
): Promise<PostgrestSingleResponse<null>> {
  const result = await supabase.from(tableName).insert(data);

  return result;
}

export async function updateData<TUpdate>(
  tableName: string,
  data: TUpdate,
  selectCol: string,
  valueCol: string
): Promise<boolean> {
  const { error } = await supabase
    .from(tableName)
    .update(data)
    .eq(selectCol, valueCol);

  if (error) {
    return false;
  } else {
    return true;
  }
}

export async function deleteData(
  tableName: string,
  selectCol: string,
  valueCol: string
): Promise<boolean> {
  const { error } = await supabase
    .from(tableName)
    .delete()
    .eq(selectCol, valueCol);

  if (error) {
    return false;
  } else {
    return true;
  }
}

export async function uploadFile(
  tableName: string,
  file: File,
  pathFile: string
) {
  const result = await supabase.storage.from(tableName).upload(pathFile, file);

  return result;
}

export async function deleteFile(tableName: string, pathFile: string) {
  const result = await supabase.storage.from(tableName).remove([pathFile]);

  return result;
}

export async function getUrlFile(path: string, bucketName: string) {
  const { data } = await supabase.storage
    .from(bucketName)
    .getPublicUrl(`${path}`);

  return data;
}

export async function loginUser(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("email", email)
    .single();

  if (error) {
    return null;
  } else {
    return data;
  }
}

export async function retriveSortData(
  tableName: string,
  selectCol: string,
  sorted: boolean
) {
  const { data, error } = await supabase
    .from(tableName)
    .select()
    .order(selectCol, { ascending: sorted });

  if (error) {
    return null;
  } else {
    return data;
  }
}
