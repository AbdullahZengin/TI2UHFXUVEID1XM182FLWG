import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

interface IBcryptService {
    hash(hashString: string): Promise<string>;
    compare(password: string, hashPassword: string): Promise<boolean>;
}

@Injectable()
class BcryptService implements IBcryptService {
    private rounds = 8;
    async hash(hashString: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.rounds);
        return await bcrypt.hash(hashString, salt);
    }
    async compare(password: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword);
    }
}

export { BcryptService };
