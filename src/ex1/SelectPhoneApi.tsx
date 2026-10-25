import React, { useCallback, useEffect, useState } from 'react';
import type { Phone } from '../types';
import { fetchPhone } from '../api/phoneApi';
import { Loading, ErrorBox } from '../components/Feedback';
import { SelectPhoneApp } from './SelectPhoneApp';

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setPhone(null);

    try {
      const data = await fetchPhone('1');
      setPhone(data);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'Đã có lỗi không xác định'
      );
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (error) {
    return <ErrorBox message={error} onRetry={() => void load()} />;
  }

  if (!phone) {
    return <Loading />;
  }

  return <SelectPhoneApp phone={phone} />;
}