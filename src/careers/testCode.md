# TDD / BDD

## TDD (Test Driven Development)

테스트 주도 개발

테스트 케이스를 만든 다음 해당 테스트 케이스의 기본 코드를 작성, 실패하는 테스트 케이스를 먼저 작성 한 후 개발 진행

코드 품질이 향상되고 재사용이 가능한 유연한 코드 생성

매우 짧은 개발 서클의 반복을 갖는 소프트웨 개발 프로세스

코드량이 늘기 때문에 빠른 생산성이 요구되는 경우 적용하기 어려움

작성 순서

1. 테스트 케이스 작성

2. 모든 테스트 케이스 실행
3. 해당 테스트 케이스에 대한 코드 개발
4. 테스트 케이스 다시 실행
5. 코드 리팩토링

## BDD (Behavior Driven Development)

행동 주도 개발

TDD에서 파생된 개발 프로세스

TDD는 테스트 자체에 집중하여 개발하지만 BDD는 비즈니스 요구사항에 집중하여 테스트 케이스 개발

테스트 케이스 자체가 요구사항이 됨

메소드 이름을 "이 클래스가 어떤 행위를 해아한다(should do something)" 라는 식의 문작으로 작성

나중에 애플리케이션이 동작을 수행하는 데 필요한 코드를 개발

1. 애플리케이션의 동작을 작성

2. 자동화 된 스크립트 작성
3. 기능 코드 구현
4. 동작이 성공했는지 확인
5. 코드 리팩토링

.

.

.

# 테스트 코드

테스트 코드는 describe()와 it() 구문으로 구성

### describe()

test suite를 작성하는 블록

test suite : 테스트 수행에 필요한 환경 설정, 공통 모듈 생성 등과 같이 세부 테스트 케이스가 수행하기 위한 기반 마련

### it()

특정 테스트 시나리오를 작성하는 부분

각 it() 구문은 별개의 테스트 케이스로 다루어져야 하고 서로 의존관계가 존재하지 않도록 작성하는 것이 중요

일반적으로 Given / When / Then 형식으로 작성

- Given : 해당 테스트 케이스가 동작하기 위해 갖추어야 하는 선행조건 (어떤 상황이 주어졌을 떄)

- When : 테스트 하고자 하는 대상코드를 실행 (해당 코드가 동작한다면)

- Then : 해당 코드의 수행 결과를 판단 (기대값과 수행결과가 맞는지를 비교)

```
describe('UserService', () = >{
    const userService: UserService = new UserService();

    describe('create', () => {
        it('should create user', () => {
            // Given
            ...

            // When
            ...

            // Then
            ...
        })

        it('should throw error when user already existx', () => {
            // Given
            ...

            // When
            ...

            // Then
            ...
        })
    })
})
```

### describe()와 it() 구문 외에 SetUp, TearDown의 개념

test suite 내에서 모든 테스트 케이스를 수행하기 전에 수행해야 하는 선행조건이 있다면 SetUp 구문으로 반복작업을 줄일 수 있음

마찬가지로 테스트 후에 후처리가 필요하다면 TearDown 구문으로 반복 작업을 줄일 수 있음

Jest에는 beforeAll(), beforeEach(), afterAll(), afterEach() 4가지 구문 제공

beforeAll(), afterAll()은 test suite 수행 전/후 한번만 실행

beforeEach(), afterEach()는 각 테스트 케이스가 수행되기 전/후 마다 실행

테스트는 테스트를 하고자 하는 대상의 동작에만 집중해야 함

외부 모듈이나 객체틑 테스트 대상이 아님, 외부 모듈은 외부 모듈만을 위한 테스트 코드를 작성해야 함

외부 모듈을 임의의 객체로 다루는 것을 테스트 더블(Test Double)이라고 함

### - Dummy

테스트를 위해 생성된 가짜 데이터, 일반적으로 매개변수 목록을 채우는 데만 사용 됨
객체가 필요하지만 내부 기능이 필요하지 않을 때 사용
함수 파라미터로는 전달되지만 내부에서 사용되지 않는 경우

```
public interface PrintWarning{
    void print()
}

public class printWarningDummy implements PrintWarning{
    @Override
    public void print(){
        // 아무런 동작을 하지 않는다
    }
}
```

printWarningDummy는 아무런 기능을 하지 않고 반환 값도 없음

dummy를 호출하기만 하면 되는 테스트이므로 내부 동작과는 상관없이 테스트는 성공

### - Fake

데이터베이스로 관리되는 다량의 데이터를 테스트 한다고 할때 실제 데이터베이스를 사용할 경우 I/O에 시간과 비용이 소요 됨
이 때 In-memory DB와 같이 메모리에 데이터를 적재해서 속도를 개선 할 수 있음
프로덕션 환경에서는 시스템이 비정상 종류되는 경우 잘못된 데이터가 남게 되므로, 세션 같은 것들을 대상으로 테스트 할 때 사용
ex) 네트워크 통신을 하여 서버 DB를 받아 데이터를 뿌려주는 로직을 fake로는 네트워크 통신을 하지 않고 테스트 객체를 만들어 실제 통신이 되어 이뤄지기 전 과정을 통일하게 수행하여 테스트 하는 방식

```
public class FakeAccountRepository implements AccountRepository {
    Map<User, Account> accounts = new HashMap<>();

    public FakeAccountRepository() {
        this.accounts.put(new User('abcde@gmail.com'), new UserAccount());
        this.accounts.put(new User('fghijk@gmail.com'), new AdminAccount());
    }

    String getPasswordHash(User user) {
        return accounts.get(user).getPasswordHash();
    }
}
```

가짜 구현을 통해 프로토타이핑을 할 수 있고 실제 데이터베이스 설계를 연기하면서 테스트를 신속하게 실행 할 수 있음

### - Stub

dummy 데이터가 실제로 동작하도록 만들어 둔 객체, 테스트를 위해 프로그래밍된 항목
함수 호출 결과를 미리 준비된 응답으로 제공

      @Before
      public void setUp() throws Exception {
        gradebook = mock(Gradebook.class)
        student = new Student()
      }

      @Test
      public void calculates_grades_average_for_student() {
        when(gradebook.gradesFor(student)).thenReturn(grades(8, 6, 10));
        double averageGrades = new GradesService(gradebook).averageGrades(student);
        assertThat(averageGrades).isEqualTo(8, 0);
      }

when을 이용하여 반환할 데이터를 미리 정의한 후 테스트 하는 코드

### - Spy

테스트 수행 정보를 기록, 테스트 도중 함수 호출에 대해 해당 함수로 전달된 파라미터, 리턴 값, 예외 뿐 아니라 함수를 몇번 호출했는지와 같은 정보들도 기록
실체 객체를 부분적으로 stubbing 하면서 동시에 약간의 정보를 기록하는 객체

```
public class MailingService {
    private int sendMailCount = 0;
    private Collection<Mail> mails = new ArrayList<>();

    public void sendMail(Mail mail) {
        sendMailCount++;
        mails.add(mail);
    }

    public long getWSendMailCount() {
        return sendMailCount;
    }
}
```

자기 자신이 호출된 상황을 확인 할 수 있는 객체가 spy

### - Mock Object

테스트 중에 만들어진 호출에 미리 준비된 답변을 제공하며 일반적으로 테스트를 위해 프로그래밍된 것 외에는 응답하지 않음

호출에 대한 기대를 명세하고 내용에 따라 동작하도록 프로그래밍 된 객체

```
@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @Test
    void test() {
        when(userRepository.findById(anyLong())).thenReturn(new User(1, "Test User"))

        User actual = userService.findById(1);
        assertThat(actual.getId()).isEqualTo(1);
        assertThat(actual.getName()).isEqualTo("Test User");
    }
}
```

UserService 인터페이스의 구현체가 findById() 메서드를 동작했을 때 어떤 결과를 반환할지를 결정할 수 있음

## Unit Testing / E2E Testing

### Unit Testing

프로젝트에서 각각의 function을 따로 테스트 하는 것

각 function이 기능을 제대로 수행하는지 확인하는 테스트

### E2E Testing

모든 시스템을 테스팅 하는 것

사용자의 입장에서 페이지 간의 연결성 등을 테스트

ex> 사용자가 특정 링크를 클릭했을 때 연결된 페이지를 정상적으로 볼 수 있어야 함
