<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Services\AuthService;
use App\Repositories\AuthRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Mockery;


class AuthServiceTest extends TestCase
{
    protected $authRepository;
    protected $authService;

    protected function setUp(): void
    {
        parent::setUp();

        $this->authRepository = Mockery::mock(AuthRepositoryInterface::class);
        $this->authService = new AuthService($this->authRepository);
    }

      /** @test */
    public function it_registers_a_user_successfully()
    {
        $data = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ];

        $user = new User($data);
        $this->authRepository->shouldReceive('createUser')
            ->once()
            ->andReturn($user);

        $result = $this->authService->register($data);

        $this->assertInstanceOf(User::class, $result);
        $this->assertEquals('John Doe', $result->name);
    }

    /** @test */
    public function it_throws_exception_if_login_fails()
    {
        $this->expectException(ValidationException::class);

        Auth::shouldReceive('attempt')->once()->andReturn(false);
        $this->authService->login(['email' => 'wrong@example.com', 'password' => 'wrongpass']);
    }

    /** @test */
    public function it_logs_in_user_successfully()
    {
        $user = new User(['email' => 'john@example.com']);
        Auth::shouldReceive('attempt')->once()->andReturn(true);
        Auth::shouldReceive('user')->once()->andReturn($user);

        $result = $this->authService->login(['email' => 'john@example.com', 'password' => 'password']);

        $this->assertInstanceOf(User::class, $result);
        $this->assertEquals('john@example.com', $result->email);
    }

    public function test_example(): void
    {
        $this->assertTrue(true);
    }
}
