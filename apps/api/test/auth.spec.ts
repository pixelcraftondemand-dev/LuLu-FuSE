import { ValidationPipe } from '@nestjs/common';
import { AuthService } from '../src/modules/auth/auth.service';
import { RegisterDto } from '../src/modules/auth/dto/register.dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService({} as any);
  });

  it('registers a user and hashes password', async () => {
    const result = await service.register({
      email: 'test@example.com',
      phone: '+15551234567',
      password: 'Password1',
      country: 'US',
      dateOfBirth: '1990-01-01',
      username: 'tester',
      displayName: 'Tester',
    });

    expect(result.message).toContain('verification');
    expect(result.user.email).toBe('test@example.com');
  });

  it('transforms incoming signup payloads into a RegisterDto', async () => {
    const pipe = new ValidationPipe({ transform: true, whitelist: true });
    const result = await pipe.transform(
      {
        email: 'signup@example.com',
        phone: '+15551234567',
        password: 'Password1',
        country: 'US',
        dateOfBirth: '1997-05-05',
        username: 'signup',
        displayName: 'Signup User',
      },
      { metatype: RegisterDto, type: 'body' },
    );

    expect(result).toBeInstanceOf(RegisterDto);
    expect(result.email).toBe('signup@example.com');
  });
});
