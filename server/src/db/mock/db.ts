import { Todo } from '../../todo/entities/todo.entity';
import { User } from '../../user/entities/user.entity';

const createMockDB = () => {
  const user1 = new User();
  user1.id = 0;
  user1.username = 'aaa';
  user1.email = 'user@qq.com';
  user1.is_admin = 0;

  const user2 = new User();
  user2.id = 1;
  user2.username = 'aab';
  user2.email = 'user1@qq.com';
  user2.is_admin = 0;

  const todo1 = new Todo();
  todo1.id = 0;
  todo1.title = 'title1';
  todo1.description = 'description1';

  const todo2 = new Todo();
  todo2.id = 1;
  todo2.title = 'title2';
  todo2.description = 'description2';

  user1.todos = [todo1];
  user2.todos = [todo2];
  todo1.author = user1;
  todo2.author = user2;

  const mockUsers: User[] = [user1, user2];
  const mockTodos: Todo[] = [todo1, todo2];

  return { mockTodos, mockUsers };
};
