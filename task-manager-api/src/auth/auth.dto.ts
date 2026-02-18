import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
 
@Module({
imports: [
TypeOrmModule.forFeature([User]),
PassportModule.register({ defaultStrategy: 'jwt' }),
JwtModule.registerAsync({
inject: [ConfigService],
useFactory: (cfg: ConfigService) => ({
secret: cfg.get('JWT_SECRET'),
signOptions: { expiresIn: cfg.get('JWT_EXPIRES_IN') },
}),
}),
],
providers: [AuthService, JwtStrategy],
controllers: [AuthController],
exports: [JwtModule],
})
export class AuthModule {}