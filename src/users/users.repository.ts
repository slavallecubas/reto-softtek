import { Injectable } from '@nestjs/common';
import {
  AttributeValue,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  QueryCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
import { AWS, DYNAMODB } from 'src/config/configuration';
import { User } from './entities/user.entity';
import { encryptPassword } from 'src/common/libs/Hash-Password';

@Injectable()
export class UserRepository {
  private readonly dynamoClient: DynamoDBDocumentClient;

  constructor() {
    const client = new DynamoDBClient({
      region: AWS.AWS_REGION,
      credentials: {
        accessKeyId: AWS.AWS_ACCESS_KEY,
        secretAccessKey: AWS.AWS_SECRET_ACCESS_KEY,
      },
    });
    this.dynamoClient = DynamoDBDocumentClient.from(client);
  }

  async findAll(): Promise<User[]> {
    const resultado: User[] = [];

    const command = new ScanCommand({
      TableName: DYNAMODB.DYNAMO_USERS_TABLE,
    });

    const response = await this.dynamoClient.send(command);

    if (response.Items!.length > 0) {
      response.Items?.forEach((item) => {
        resultado.push(User.nuevaInstanciaFromDynamo(item));
      });
    }
    return resultado;
  }

  async newOne(data: User): Promise<Partial<User>> {
    const passwordHasheada: string = await encryptPassword(data.passwordHash);

    const itemObject: Record<string, AttributeValue> = {
      userId: { S: data.userId },
      nombre: { S: data.nombre },
      email: { S: data.email },
      passwordHash: { S: passwordHasheada },
      createdAt: { N: String(data.createdAt.getTime()) },
    };

    if (data.updatedAt) {
      itemObject.updatedAt = { N: String(data.updatedAt.getTime()) };
    }

    const command = new PutItemCommand({
      TableName: DYNAMODB.DYNAMO_USERS_TABLE,
      Item: itemObject,
    });

    await this.dynamoClient.send(command);
    const { passwordHash, ...rest } = data;
    return rest;
  }

  async getOneByEmail(email: string): Promise<User | null> {
    const command = new QueryCommand({
      TableName: DYNAMODB.DYNAMO_USERS_TABLE,
      IndexName: 'email-index',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    });

    const response = await this.dynamoClient.send(command);

    if (response.Items && response.Items.length > 0) {
      return User.nuevaInstanciaFromDynamo(response.Items[0]);
    }

    return null;
  }

  async getOneById(userId: string): Promise<User | null> {
    const commmand = new GetItemCommand({
      TableName: DYNAMODB.DYNAMO_USERS_TABLE,
      Key: {
        userId: { S: userId },
      },
    });

    const response = await this.dynamoClient.send(commmand);
    if (response.Item) {
      return User.nuevaInstanciaFromDynamo(response.Item);
    }
    return null;
  }
}
