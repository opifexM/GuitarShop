import { Entity } from 'shared/base/entity';
import { User } from 'shared/type/user/user';

export class UserEntity extends Entity implements User {
  name: string;
  email: string;
  password: string;

  constructor(user?: User) {
    super();
    this.fillUserData(user);
  }

  public fillUserData(user?: User): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      password: this.password,
    };
  }
}
