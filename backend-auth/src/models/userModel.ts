export const createUserWithVerification = `
  INSERT INTO public.user1 (name, email, password, verification_token, verification_token_expires)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id, name, email, created_at
`;

export const getUserByEmail = `
  SELECT * FROM public.user1 WHERE email = $1
`;

export const getUserByResetToken = `
  SELECT * FROM public.user1
  WHERE reset_token = $1 AND reset_token_expires > NOW()
`;

export const setResetTokenByEmail = `
  UPDATE public.user1 SET reset_token = $1, reset_token_expires = $2
  WHERE email = $3
`;

export const resetUserPassword = `
  UPDATE public.user1
  SET password = $1, reset_token = NULL, reset_token_expires = NULL
  WHERE id = $2
`;

export const clearResetToken = `
  UPDATE public.user1 
  SET reset_token = NULL, reset_token_expires = NULL 
  WHERE id = $1
`;

export const updateVerificationToken = `
  UPDATE public.user1
  SET verification_token = $1,
      verification_token_expires = $2
  WHERE email = $3
`;

export const verifyUserEmail = `
  UPDATE public.user1
  SET is_verified = TRUE, verification_token = NULL, verification_token_expires = NULL
  WHERE verification_token = $1 AND verification_token_expires > NOW()
`;

export const getUserByVerificationToken = `
  SELECT * FROM public.user1
  WHERE verification_token = $1 AND verification_token_expires > NOW()
`;

export const updateUserProfile = `
  UPDATE public.user1
  SET name = $1, updated_at = CURRENT_TIMESTAMP
  WHERE id = $2
  RETURNING id, name, email, role, is_verified, created_at, updated_at
`;

export const changeUserPassword = `
  UPDATE public.user1
  SET password = $1, updated_at = CURRENT_TIMESTAMP
  WHERE id = $2
`;
