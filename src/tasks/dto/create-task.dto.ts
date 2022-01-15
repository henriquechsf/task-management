import { IsNotEmpty } from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty({ message: 'Título é obrigatório' })
  title: string;

  @IsNotEmpty()
  description: string;
}
