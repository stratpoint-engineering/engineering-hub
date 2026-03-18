# **Java Spring Boot Project Structure Guidelines**

Based on the Enterprise Standards and Templates Framework. This Java Spring Boot project guidelines document provides a structured approach aligned with enterprise standards. Following these guidelines will ensure your Spring Boot applications are secure, maintainable, and follow industry best practices.

## **Project Structure**

`/spring-boot-project/`  
├── `.github/                          # GitHub specific files`  
│   ├── `workflows/                    # CI/CD workflows`  
│   ├── `PULL_REQUEST_TEMPLATE.md      # PR template`  
│   └── `ISSUE_TEMPLATE/               # Issue templates`  
├── `src/`  
│   ├── `main/`  
│   │   ├── `java/com/company/[app]/`  
│   │   │   ├── `config/               # Configuration classes`  
│   │   │   │   ├── `SecurityConfig.java`  
│   │   │   │   ├── `SwaggerConfig.java`  
│   │   │   │   └── `AppConfig.java`  
│   │   │   ├── `controller/           # REST API endpoints`  
│   │   │   │   ├── `v1/               # Version 1 API controllers`  
│   │   │   │   └── `advice/           # Controller advice (error handling)`  
│   │   │   ├── `model/                # Domain models and DTOs`  
│   │   │   │   ├── `entity/           # JPA entities`  
│   │   │   │   ├── `dto/              # Data Transfer Objects`  
│   │   │   │   └── `mapper/           # Object mappers`  
│   │   │   ├── `repository/           # Data access layer`  
│   │   │   ├── `service/              # Business logic`  
│   │   │   │   ├── `impl/             # Service implementations`  
│   │   │   │   └── `interfaces/       # Service interfaces`  
│   │   │   ├── `exception/            # Custom exceptions`  
│   │   │   ├── `security/             # Security components`  
│   │   │   └── `util/                 # Utility classes`  
│   │   └── `resources/`  
│   │       ├── `application.yml       # Common application properties`  
│   │       ├── `application-dev.yml   # Development properties`  
│   │       ├── `application-test.yml  # Test properties`  
│   │       ├── `application-prod.yml  # Production properties`  
│   │       ├── `db/migration/         # Flyway/Liquibase migrations`  
│   │       └── `static/               # Static resources (if needed)`  
│   └── `test/`  
│       ├── `java/com/company/[app]/   # Test classes mirroring main structure`  
│       │   ├── `controller/           # Controller tests`  
│       │   ├── `service/              # Service tests`  
│       │   ├── `repository/           # Repository tests`  
│       │   └── `integration/          # Integration tests`  
│       └── `resources/                # Test resources`  
│           └── `application-test.yml  # Test configuration`  
├── `docs/                             # Documentation`  
│   ├── `architecture/                 # Architecture diagrams and docs`  
│   ├── `api/                          # API documentation`  
│   └── `operations/                   # Operational guides`  
├── `k8s/                              # Kubernetes manifests`  
│   ├── `base/                         # Base configurations`  
│   │   ├── `deployment.yaml`  
│   │   ├── `service.yaml`  
│   │   └── `kustomization.yaml`  
│   └── `overlays/                     # Environment-specific configurations`  
│       ├── `dev/`  
│       ├── `staging/`  
│       └── `prod/`  
├── `.editorconfig                     # Editor configuration`  
├── `.gitignore                        # Git ignore file`  
├── `Dockerfile                        # Container definition`  
├── `docker-compose.yml                # Local development setup`  
├── `pom.xml                           # Maven dependencies and plugins`  
└── `README.md                         # Project overview`

## 

## **Coding Standards**

### **Naming Conventions**

1. **Classes**: PascalCase (e.g., `UserService`)  
2. **Methods/Variables**: camelCase (e.g., `getUserById`)  
3. **Constants**: UPPER\_SNAKE\_CASE (e.g., `MAX_RETRY_COUNT`)  
4. **Packages**: lowercase with dots (e.g., `com.company.module`)  
5. **Repository Names**: Suffix with "Repository" (e.g., `UserRepository`)  
6. **Service Names**: Suffix with "Service" (e.g., `UserService`)  
7. **Controller Names**: Suffix with "Controller" (e.g., `UserController`)

### **Code Organization**

1. **Controller Layer**  
   * Handle HTTP requests/responses  
   * Input validation  
   * Call appropriate service methods  
   * Map service responses to API responses  
   * Minimal business logic  
   * Uses the `@ControllerAdvice` pattern to centralize error management, ensuring consistent API error responses  
   * Process requests to the Service Layer uses DTOs  
2. **Service Layer**   
   * Implement business logic  
   * Transaction management  
   * Call repositories as needed  
   * Handle business exceptions  
   * Process Requests to the Repository Layer uses Entities  
   * Process Responses to the Controller Layer uses DTOs  
3. **Repository Layer**  
   * Data access operations  
   * Spring Data JPA repositories  
   * Custom queries when needed  
   * Process Responses to the Service Layer uses Entities  
4. **Model Layer**  
   * JPA entities for database mapping  
   * DTOs for API request/response  
   * Records for cross-service / transactional processes.  
   * Mappers to convert between Entities and DTOs (or Records)

**API Design Standards**

## **URL Structure**

* Use plural nouns for resources (e.g., `/api/v1/users`)  
* Use resource IDs for specific resources (e.g., `/api/v1/users/{id}`)  
* Use sub-resources for related entities (e.g., `/api/v1/users/{id}/orders`)  
* Use query parameters for filtering, sorting, pagination (e.g., `/api/v1/users?status=active&sort=lastName`)

### **HTTP Methods**

* `GET`: Retrieve resources  
* `POST`: Create new resources  
* `PUT`: Update resources (full update)  
* `PATCH`: Partial update of resources  
* `DELETE`: Remove resources

### **Status Codes**

* `200 OK`: Successful request  
* `201 Created`: Resource created successfully  
* `204 No Content`: Successful request with no response body  
* `400 Bad Request`: Invalid request parameters  
* `401 Unauthorized`: Authentication required  
* `403 Forbidden`: Authenticated but not authorized  
* `404 Not Found`: Resource not found  
* `409 Conflict`: Request conflicts with current state  
* 500 Internal Server Error: Server error

### **Response Format**

`{`  
  `"status": "success",`  
  `"data": { // Resource data },`  
  `"meta": {`  
    `"timestamp": "2023-01-01T12:00:00Z",`  
    `"pagination": {`  
      `"page": 1,`  
      `"size": 10,`  
      `"totalElements": 100,`  
      `"totalPages": 10`  
    `}`  
  `}`  
`}`

### **Error Response Format**

`{`  
  `"status": "error",`  
  `"error": {`  
    `"code": "USER_NOT_FOUND",`  
    `"message": "User with ID 123 not found",`  
    `"details": [`  
      `{`  
        `"field": "id",`  
        `"message": "No user exists with the provided ID"`  
      `}`  
    `]`  
  `},`  
  `"meta": {`  
    `"timestamp": "2023-01-01T12:00:00Z",`  
    `"traceId": "abc-123-xyz"`  
  `}`  
`}`

## 

## **Architectural Structure**

### **Dependency Injection (DI)**

Enables loose coupling by injecting dependencies into components rather than creating them within the component itself (Setter / Field Injection).

**Best Practice:** Constructor Injection should be used to ensure immutability, thread-safety, and to eliminate null-states.

```java
@Service("myService")public class MyServiceImpl implements MyService{
	private final MyComponent myAction;
private final MyComponent myApproach;
	public MyServiceImpl(
		@Qualifier("myAction") MyComponent myAction,
@Qualifier("myApproach") MyComponent myApproach
	)
	{
		this.myAction = myAction;
		this.myApproach = myApproach;
	}
public String testMe()	{
	return myAction.doIt() + " " + myApproach.doIt();
}}
@Component("myAction")
public class MyActionImpl implements MyComponent{
	public String doIt()
	{
		return "I'm ready for best practices!";
	}
}
@Component("myApproach")
public class MyApproachImpl implements MyComponent{
	public String doIt()
	{
		return "Constructor Injection!";
	}
}
```

### **Proxy Pattern**

To control access to the original object by allowing the performing of actions either before or after the request reaches the real object.

**Best Practice:** Spring’s AOP (Aspect Oriented Programming) should be utilized to implement cross-cutting concerns like `@Transactional` logging and security checks to reduce redundant validations on business-logic implementations.

```java
// Custom Annotation@Target(ElementType.METHOD) 
@Retention(RetentionPolicy.RUNTIME) 
public @interface CheckUserSession { String requiredRole() default "USER"; }

// Aspect@Aspect 
@Component 
public class SessionProxyAspect { 
private final HttpServletRequest request;
private final RedisService redisService;
public SessionProxyAspect(
@Autowired HttpServletRequest request,
@Qualifier("redisService") RedisService redisService) {
this.request = request;
this.redisService = redisService;
} 
@Around("@annotation(checkSession)") 
public Object validateSession(ProceedingJoinPoint joinPoint, CheckUserSession checkSession) throws Throwable {
String sessionId = request.getHeader("X-Session-ID");
String currentRole = redisService.getSessionRole(sessionId);
if (currentRole == null || !currentRole.equals(checkSession.requiredRole())) { 
throw new UnauthorizedAccessException("Required role: " + checkSession.requiredRole()); 
} 
return joinPoint.proceed();
} 
}

@Service 
public class SensitiveDataService { 
@CheckUserSession(requiredRole = "ADMIN")
public Data getFinancialReports() { 
// Business logic only - no session checks here! 
return repository.fetchSecretData(); 
}
}
```

### **Factory Pattern**

Simplifies object creation by providing an interface in a superclass while allowing subclasses to alter the type of objects created, effectively decoupling creation logic from client code.

**Best Practice:** Factory pattern implementations should leverage Springboot in managing the instances provided by the factory, as those are initialized only during application start-up. Since springbeans are singleton in scope (by default), this ensures lower memory utilization.

```java
public interface NotificationProvider { 
void send(String recipient, String message); 
}@Service("SMS") // The name qualifier serves as the key in the factory map
public class SmsNotificationService implements NotificationProvider { 
@Override public void send(String r, String m) { /* ... */ } 
} 
@Service("EMAIL") 
public class EmailNotificationService implements NotificationProvider { 
@Override public void send(String r, String m) { /* ... */ } 
}
@Service("PUSH") 
public class PushNotificationService implements NotificationProvider { 
@Override public void send(String r, String m) { /* ... */ } 
}

@Service ("notificationServiceFactory")
public class NotificationFactory { 
/* Spring DI automatically maps all of the classes implementing 
   NotificationProvider */
private final Map<String, NotificationProvider> providers; 
public NotificationFactory(Map<String, NotificationProvider> providers) {
this.providers = providers; 
} 
public void notify(String type, String recipient, String message) { 
NotificationProvider provider = providers.get(type.toUpperCase());
if (provider == null) { 
throw new UnsupportedOperationException("No provider found for: " + type); 
} 
provider.send(recipient, message); 
}
}
```

### **Observer Pattern**

Components should publish and subscribe to application events to maintain loosely coupled communication.

**Best Practice:** 

* Initial Configuration:  
  * Use Java Records for All Event Payloads. For thread-safety.  
  * Virtual Thread Task Executor for `@Async`. For observer scalability.  
  * Explicit `@EnableAsync` and `@EnableTransactionManagement`. For concurrency optimizing.

```java
@Configuration
@EnableAsync // Required to process @Async annotations
@EnableTransactionManagement // Required for Transactional observers
public class AsyncEventConfig {

    @Bean
    public Executor taskExecutor() {
        // ENFORCE: Use Virtual Threads for massive concurrency
        return Executors.newVirtualThreadPerTaskExecutor();
    }
}
/**
 * Record defined in its own file.
 * Relevant projection: Only contains data needed by observers.
 */
public record UserRegistrationEvent(
    Long userId, 
    String email, 
    String status,
    LocalDateTime timestamp
) {}
```

* Observers:  
  * Use `@TransactionalEventListener(phase = AFTER_COMMIT)` for External Side-Effects to ensure consistency in output and behavior.  
  * Use `@EventListener` for Internal Auditing, Metrics or other low to zero committal processes to ensure its executions.  
  * Use `@Async` on All Listeners to maximize performance and throughput.\\

```java
@Component
@Slf4j
public class UserObserver {
    /**
     * INTERNAL OBSERVER (Immediate)
     * ENFORCE: @EventListener for internal logs/metrics.
     * Fires immediately, even if the transaction fails later.
     */
    @Async
    @EventListener(condition = "#event.status == 'PENDING'")
    public void logAuditAttempt(UserRegistrationEvent event) {
        log.info("[AUDIT] Registration attempt started for User ID: {}", event.userId());
        // Logic: Write to an 'Audit_Attempts' table or Redis
    }

    /**
     * EXTERNAL OBSERVER (Reliable)
     * ENFORCE: @TransactionalEventListener for external side-effects (Email/API).
     * Fires ONLY after the database successfully COMMITS.
     */
    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void sendWelcomeEmail(UserRegistrationEvent event) {
        log.info("[EXTERNAL] Sending Welcome Email to {}...", event.email());
        // Logic: Call Email Service / Third-party SMTP
    }
}
```

* Publishers:  
  * Use `@Transactional` for Business State Changes to ensure data integrity. (ex. database insertions)  
  * Never perform slow I/O (like calling a 3rd-party API) inside the `@Transactional` method as it will negatively affect process throughput.  
  * Never use `@Transactional` for Non-State Changes as it will negatively affect resource (cpu/memory) utilization. (ex: read-only transactions)

```java
@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final ApplicationEventPublisher eventPublisher;
    private final UserRepository userRepository;

    /**
     * TRANSACTIONAL PUBLISHER
     * Fires both Immediate and Reliable observers.
     */
    @Transactional
    public void registerNewUser(String email) {
        // 1. Service Logic: Database Persistence
        User user = userRepository.save(new User(email, "PENDING"));

        // 2. Publish Event
        // Both listeners hear this, but the @Transactional one "buffers"
        eventPublisher.publishEvent(new UserRegistrationEvent(
            user.getId(), email, user.getStatus(), LocalDateTime.now()
        ));

        // 3. Finalization: If an exception occurs here, the Email is NEVER sent.
        log.info("Finished registration logic for user: {}", user.getId());
    }

    /**
     * NON-TRANSACTIONAL PUBLISHER
     * The 'Reliable' observer is blind to this.
     */
    public void anonymousPing(String email) {
        // No @Transactional here!
        eventPublisher.publishEvent(new UserRegistrationEvent(0L, email, "PING", LocalDateTime.now()));
        
        // RESULT: Only the @EventListener fires. 
        // The @TransactionalEventListener discards the event (Safe-Failure).
    }
}
```

### **Builder Pattern**

Facilitates the creation of complex objects through a fluent, readable interface, commonly used in Spring’s internal configuration and for building DTOs.

**Best Practice:** 

* DTOs:  
  * Use `@AllArgsConstructor(access = AccessLevel.PRIVATE)` to force the use of the builder methods.   
  * Use `@Builder` for a valid initial state, `@Setter(AccessLevel.PROTECTED)` for attributes that need to change after creation.  
  * Use `@Builder.Default` for initialization of fields.

```java
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // For JPA/Jackson
@AllArgsConstructor(access = AccessLevel.PRIVATE) // Forced use of Builder
@Builder(toBuilder = true)
@JsonDeserialize(builder = UserAccountDTO.UserAccountDTOBuilder.class) // For Jackson
@ValidUserAccount // Our custom external validator
public class UserAccountDTO {
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Mobile number is required")
    @Pattern(
        regexp = "^(\\+63-9|09)\\d{9}$", 
        message = "Mobile must follow +63-9XXXXXXXXX or 09XXXXXXXXX format"
    )
    private String mobileNumber;

    @Setter(AccessLevel.PROTECTED) // Only the builder has access to this
    @Builder.Default
    private String status = "INACTIVE";

    // Self-Validation on Build
    public static class UserAccountDTOBuilder {
        public UserAccountDTO build() {
            UserAccountDTO dto = new UserAccountDTO(email, mobileNumber, status);
            ValidationUtils.validate(dto);
            return dto;
        }
    }
}
```

* \[Java 25\] Unified Pattern Matching  
  * Allows the same syntax of `instanceof` and `switch` and to work identically across Objects, primitive types, and records.  
  * This should be used to reduce the code bloat in the validation process within the context of type-match sensitive events.

```java
public String formatAttribute(Object value) 
{ 
return switch (value) 
{ 
// Matches if it's a number and safely fits in an int 
case int i when i > 1000 -> "Large Metric: " + i; 
case int i -> "Standard Metric: " + i; /

// Matches if it's text case 
String s -> "Label: " + s.strip(); 

// Unified patterns can even handle nulls safely 
case null -> "Missing Data"; 
default -> "Unknown format"; 
}; 
}
```

* \[Java 25\] Flexible Constructor Validation   
  * This should be used to perform logic (validation, calculation, etc.) *before* calling `super()` or `this()`.   
  * This prevents passing invalid data to a parent class, increasing object reliability.

```java
public class SecuredUser extends User 
{ 
private final String role;
public SecuredUser(String email, String role) 
{ 
if (email == null || !email.contains("@")) 
{ 
throw new IllegalArgumentException("Invalid email"); 
} // Logic before super() was not allowed before Java25
super(email); 
this.role = role; 
} 
}
```

* Further Validation:  
  * Utilize a global validator class for shared validations across multiple DTOs.  
  * Utilize a specific validator class (with associated custom annotation) for business-level validations.

```java
// Global-level Validator Utils Class
public class ValidationUtils {
    private static final Validator VALIDATOR = Validation.buildDefaultValidatorFactory()
.getValidator();
    public static <T> void validate(T object) {
        Set<ConstraintViolation<T>> violations = VALIDATOR.validate(object);
        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
    }
}

// Custom Annotation
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UserAccountValidator.class)
public @interface ValidUserAccount {
    String message() default "Business validation failed for user account";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

// External Validator Class
public class UserAccountValidator implements ConstraintValidator<ValidUserAccount, UserAccountDTO> {
    @Override
    public boolean isValid(UserAccountDTO dto, ConstraintValidatorContext context) {
        // Example: Business logic validation (Cross-field)
        if (dto.getEmail() == null || dto.getMobileNumber() == null) return false;
        return true;
    }
}
// Validated Service Class@Service
@Validated // Spring will now intercept setter calls or service calls
public class UserService {
// Throws a ConstraintViolationException before execution if the object is invalid.
    public void updateUserInfo(@Valid UserAccountDTO dto) {
// Conceptually "updating", but safely creating a new instance.
UserAccountDTO updatedStatus = dto.toBuilder() .status("ACTIVE").build();
    }
}
```

## **Concurrency Implementation**

### **\[Java 21\] Virtual Thread Concurrency**

Primary design goal is to improve throughput for applications that are I/O-bound (spend most of their time waiting for external resources) (like waiting for 3rd-party application responses, database calls, file reading, etc.)

**Best Practice:** Always use `Executors.newVirtualThreadPerTaskExecutor` to leverage Spring-managed virtual threads for less custom concurrency boilerplate overheads. 

```java
Thread vt = Thread.ofVirtual().start(() -> System.out.println("Virtual thread running"));
vt.join();
// or

ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();
executor.submit(() -> {
    System.out.println("Task running in virtual thread");
});
executor.shutdown();
```

Note: This can be utilized in Springboot by defining the following properties.

```

# application.yml
spring:
  task:
    execution:
      type: virtual
      pool:
        keep-alive: 60s      # Optional, keep-alive time for idle threads
        max-size: 1000       # Optional, maximum threads (mostly advisory for virtual threads)
#####
# or #
#####
# application.properties
spring.task.execution.type=virtual spring.task.execution.pool.keep-alive=60s # Optional, keep-alive time for idle threads
spring.task.execution.pool.max-size=1000 # Optional, maximum threads (mostly advisory for virtual threads)
```

### **\[Java 21\] Structured Concurrency**

Uses `StructuredTaskScope` to treat a group of related tasks as a single unit of work. It functions as follows:

* If one subtask fails, the others are automatically cancelled, preventing "orphan" threads.

This ensures that correlated business logic is completed (albeit not necessarily sequentially) before proceeding to the next set of instructions.

**Best Practice:** Use the appropriate scope for the structured task depending on the needs of the process.

* Use `StructuredTaskScope.ShutdownOnSuccess()` if only one task is needed to be completed.  
* Use `StructuredTaskScope.ShutdownOnFailure()` if all the tasks are needed to be completed.

```java
public Response getProfile(String id) throws ExecutionException, InterruptedException { 
	try (var scope = new StructuredTaskScope.ShutdownOnFailure()) 
{ 
Subtask<User> user = scope.fork(() -> fetchUser(id)); Subtask<Order> order = scope.fork(() -> fetchLatestOrder(id));

/* 
Can be used to set a timeframe:
scope.joinUntil(new Instant.now().plusSeconds(5)).result()
*/

scope.join(); // Wait for both 
scope.throwIfFailed(); // Propagate errors 

return new Response(user.get(), order.get()); 
}
}
```

### **Circuit Breaker Pattern**

Implements resilience by preventing a failure in one service from cascading to others, a critical standard for cloud-native applications (Resilience4j).

**Best Practice:** 

* Use the sliding window for the circuit breaker depending on the needs of the process.  
  * Use `COUNT_BASED` for services with expected low traffic to process.  
  * Use `TIME_BASED` for services with expected high traffic to process.  
* Don't trip the circuit for "Business Errors", Only trip for "Infrastructure Errors"

**Configuration:**

```
resilience4j:
  circuitbreaker:
    instances:
      externalOrderService:
        registerHealthIndicator: true
        slidingWindowSize: 10 # Check the last 10 calls
        failureRateThreshold: 50 # Trip if 5 failures in 10
        waitDurationInOpenState: 10000ms # Wait 10s before Half-Open
        permittedNumberOfCallsInHalfOpenState: 3
        slidingWindowType: COUNT_BASED # or TIME_BASED
```

**Implementation:**

```java
@Service
@RequiredArgsConstructor
public class OrderService {
    private final ExternalApiClient apiClient;

    @CircuitBreaker(name = "externalOrderService", fallbackMethod = "handleApiFailure")
    public OrderResponse processOrder(OrderRequest request) {
        // This call is protected by the circuit breaker logic
        return apiClient.submit(request);
    }

    // Defensive Fallback: Runs only when the circuit is OPEN or an error occurs
    private OrderResponse handleApiFailure(OrderRequest request, Throwable t) {
        log.error("Circuit Breaker triggered. Reason: {}", t.getMessage());
        return OrderResponse.builder().status("QUEUED_LOCAL")
                .message("Provider is down; order cached for retry.").build();
    }
}
```

**Circuit Breaker Pattern**  
Implements resilience by preventing a failure in one service from cascading to others, a critical standard for cloud-native applications (Resilience4j).

**Best Practice:** 

* Use the sliding window for the circuit breaker depending on the needs of the process.  
  * Use `COUNT_BASED` for services with expected low traffic to process.  
  * Use `TIME_BASED` for services with expected high traffic to process.

Don't trip the circuit for "Business Errors", Only trip for "Infrastructure Errors"

## **Enterprise / Cloud-native Patterns**

### **API Gateway Pattern**

Uses tools like Spring Cloud Gateway to manage, route, and secure requests in a microservices environment.

### **Saga Pattern** 

Manages distributed transactions across multiple microservices to ensure eventual consistency in complex event-driven workflows.

### **Modular Monolith** 

Build as a single deployable unit but with strictly enforced module boundaries, often using Spring Modulith to verify these boundaries.

## 

## **Security Implementation**

### **Authentication**

1. **Spring Security Configuration**  
   * Use JWT-based authentication  
   * Implement token-based session management  
   * Use refresh tokens with proper rotation  
       
2. **Password Security**  
   * Use BCrypt password encoding  
   * Implement password complexity requirements  
   * Add account lockout after failed attempts

### **Authorization**

1. **Role-Based Access Control**  
   * Define clear roles (e.g., USER, ADMIN)  
   * Use method-level security with @PreAuthorize  
   * Implement fine-grained permissions  
       
2. **API Security**  
   * Use HTTPS for all endpoints  
   * Implement CORS properly  
   * Add rate limiting  
   * Use security headers (CSRF, XSS protection)

### **Data Protection**

1. **Data Encryption**  
   * Encrypt sensitive data at rest  
   * Use attribute-level encryption where needed  
   * Implement proper key management  
       
2. **Input Validation**  
   * Validate all input parameters  
   * Use Bean Validation (JSR-380)  
   * Implement custom validators for complex rules

## **Database Best Practices**

### **Database Access**

1. **JPA/Hibernate Configuration**  
   * Use appropriate fetch types (LAZY by default)  
   * Configure connection pooling (HikariCP)  
   * Set query timeout values  
       
2. **Schema Management**  
   * Use Flyway or Liquibase for migrations  
   * Version all schema changes  
   * Include rollback scripts  
       
3. **Performance Optimization**  
   * Use indexing appropriately  
   * Implement pagination for large result sets  
   * Use query caching where appropriate  
   * Consider using query projections for specific needs

## 

## **Testing Requirements**

### **Test Coverage**

1. **Minimum Requirements**  
   * 80% code coverage overall  
   * 90% coverage for service layer  
   * 100% coverage for critical business logic  
       
2. **Test Types**  
   * Unit tests for services and utilities  
   * Integration tests for repositories  
   * API tests for controllers  
   * End-to-end tests for critical flows

### **Testing Standards**

1. **Unit Testing**  
   * Use JUnit 5 with Mockito  
   * Test both positive and negative scenarios  
   * Use parameterized tests for boundary conditions  
       
2. **Integration Testing**  
   * Use @SpringBootTest for repository tests  
   * Use TestContainers for database integration  
   * Clean up test data after tests  
       
3. **API Testing**  
   * Use MockMvc or RestAssured  
   * Test all endpoints  
   * Verify response structure and status codes

## 

## **Configuration Management**

### **Environment-Specific Configuration**

1. **Profile-Based Configuration**  
   * Use Spring profiles (dev, test, staging, prod)  
   * Externalize sensitive configuration  
   * Use environment variables for secrets  
2. **Configuration Hierarchy**  
   * Base application.yml for common properties  
   * Profile-specific files for overrides  
   * Environment variables for final overrides

### **Logging Strategy**

1. **Logging Configuration**  
   * Use SLF4J with Logback  
   * Configure different log levels per environment  
   * Use structured logging (JSON format)  
   * Include correlation IDs for request tracing  
2. **Log Content**  
   * Avoid logging sensitive information  
   * Include contextual information  
   * Log start/end of significant operations  
   * Log exceptions with stack traces (in non-prod)

## 

## **Containerization**

### **Dockerfile Best Practices**

`# Multi-stage build for optimized image size`  
`FROM maven:3.8.5-openjdk-17-slim AS build`  
`WORKDIR /app`  
`COPY pom.xml .`  
`# Download dependencies separately (better caching)`  
`RUN mvn dependency:go-offline`

`COPY src ./src`  
`RUN mvn package -DskipTests`

`# Runtime image`  
`FROM eclipse-temurin:17-jre-alpine`  
`WORKDIR /app`

`# Add non-root user`  
`RUN addgroup -S spring && adduser -S spring -G spring`  
`USER spring:spring`

`# Copy built artifact from the build stage`  
`COPY --from=build /app/target/*.jar app.jar`

`# Configure health check`  
`HEALTHCHECK --interval=30s --timeout=3s CMD wget -q --spider http://localhost:8080/actuator/health || exit 1`

`# Run with proper JVM options`  
`ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]`

### 

### **Docker Compose for Local Development**

`version: '3.8'`

`services:`  
  `app:`  
    `build: .`  
    `ports:`  
      `- "8080:8080"`  
    `environment:`  
      `- SPRING_PROFILES_ACTIVE=dev`  
      `- SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/appdb`  
      `- SPRING_DATASOURCE_USERNAME=postgres`  
      `- SPRING_DATASOURCE_PASSWORD=postgres`  
    `depends_on:`  
      `- db`  
    `volumes:`  
      `- ./logs:/app/logs`

  `db:`  
    `image: postgres:14-alpine`  
    `ports:`  
      `- "5432:5432"`  
    `environment:`  
      `- POSTGRES_DB=appdb`  
      `- POSTGRES_USER=postgres`  
      `- POSTGRES_PASSWORD=postgres`  
    `volumes:`  
      `- postgres_data:/var/lib/postgresql/data`

`volumes:`  
  `postgres_data:`

## 

## **CI/CD Pipeline**

### **GitHub Actions Workflow**

`name: Java Spring Boot CI/CD`

`on:`  
  `push:`  
    `branches: [main, develop]`  
  `pull_request:`  
    `branches: [main, develop]`

`jobs:`  
  `# Quality Gates`  
  `quality:`  
    `runs-on: ubuntu-latest`  
    `steps:`  
      `- uses: actions/checkout@v3`  
        
      `- name: Set up JDK 17`  
        `uses: actions/setup-java@v3`  
        `with:`  
          `java-version: '17'`  
          `distribution: 'temurin'`  
          `cache: 'maven'`  
        
      `- name: Code quality checks`  
        `run: mvn checkstyle:check pmd:check spotbugs:check`  
        
      `- name: Dependency check`  
        `run: mvn dependency-check:check`  
        
      `- name: Unit tests`  
        `run: mvn test`  
        
      `- name: Test coverage`  
        `run: mvn jacoco:report`  
        
      `- name: Upload coverage to Codecov`  
        `uses: codecov/codecov-action@v3`

  `# Build and Integration Tests`  
  `build:`  
    `needs: quality`  
    `runs-on: ubuntu-latest`  
    `steps:`  
      `- uses: actions/checkout@v3`  
        
      `- name: Set up JDK 17`  
        `uses: actions/setup-java@v3`  
        `with:`  
          `java-version: '17'`  
          `distribution: 'temurin'`  
          `cache: 'maven'`  
        
      `- name: Build and integration tests`  
        `run: mvn verify`  
        
      `- name: Build Docker image`  
        `run: docker build -t myapp:${{ github.sha }} .`  
        
      `- name: Container scan`  
        `uses: aquasecurity/trivy-action@master`  
        `with:`  
          `image-ref: 'myapp:${{ github.sha }}'`  
          `format: 'table'`  
          `exit-code: '1'`  
          `severity: 'CRITICAL,HIGH'`

  `# Deployment (to staging for develop branch, to production for main)`  
  `deploy:`  
    `needs: build`  
    `if: github.event_name == 'push' && (github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop')`  
    `runs-on: ubuntu-latest`  
    `environment:`  
      `name: ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}`  
    `steps:`  
      `- uses: actions/checkout@v3`  
        
      `- name: Set up kubectl`  
        `uses: azure/setup-kubectl@v3`  
        
      `- name: Set Kubernetes context`  
        `uses: azure/k8s-set-context@v2`  
        `with:`  
          `kubeconfig: ${{ secrets.KUBE_CONFIG }}`  
        
      `- name: Deploy to environment`  
        `run: |`  
          `cd k8s/overlays/${{ github.ref == 'refs/heads/main' && 'prod' || 'staging' }}`  
          `kustomize build | kubectl apply -f -`  
        
      `- name: Verify deployment`  
        `run: |`  
          `kubectl rollout status deployment/myapp -n ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}`

## 

## **Documentation Requirements**

1. **README.md**  
   * Project overview  
   * Setup instructions  
   * Key technologies  
   * API overview  
   * Environment setup  
   * Common issues and solutions  
       
2. **API Documentation**  
   * Use Springdoc-OpenAPI (Swagger)  
   * Document all endpoints  
   * Include example requests/responses  
   * Document error responses  
   * Mark required vs. optional fields  
       
3. **Architecture Documentation**  
   * System context diagram  
   * Container diagram  
   * Component diagrams  
   * Data models  
   * Sequence diagrams for key flows  
       
4. **Operations Documentation**  
   * Deployment procedures  
   * Scaling guidelines  
   * Monitoring setup  
   * Backup and recovery  
   * Incident response

## 

## **Monitoring and Observability**

1. **Spring Boot Actuator**  
   * Enable appropriate endpoints  
   * Secure sensitive endpoints  
   * Configure health checks  
   * Expose metrics for Prometheus  
       
2. **Metrics Collection**  
   * Use Micrometer for metrics  
   * Track key business metrics  
   * Monitor API response times  
   * Track database operation times  
       
3. **Distributed Tracing**  
   * Implement with Spring Cloud Sleuth and Zipkin  
   * Add correlation IDs to logs  
   * Track external service calls

## 

## **Security Gates**

### **Development Security Gates**

1. **Code Quality Gate**  
   * Static code analysis with SonarQube  
   * Enforced code coverage thresholds  
   * Dependency vulnerability scanning  
   * Secure coding practices enforcement  
       
2. **Design Security Gate**  
   * Security architecture review  
   * Data classification assessment  
   * Authentication/authorization design review  
   * API security review

### **Deployment Security Gates**

1. **Pre-Deployment Security Gate**  
   * Container security scanning  
   * OWASP dependency check  
   * Secret scanning  
   * SBOM generation  
       
2. **Post-Deployment Security Gate**  
   * API security testing  
   * Penetration testing  
   * Security configuration verification  
   * Runtime vulnerability scanning

## 

## **AI-Assisted Development**

Guidelines for using AI coding tools effectively and responsibly in Java Spring Boot projects.

### **Claude Code**

**Recommended uses:**
- Scaffolding new controllers, services, repositories, and DTOs following the layer structure above
- Generating boilerplate (Lombok-annotated DTOs, JUnit 5 test classes, Flyway migration scripts, CI/CD pipelines)
- Explaining unfamiliar patterns (e.g., AOP proxies, structured concurrency, circuit breaker configuration)
- Drafting unit and integration tests using JUnit 5, Mockito, and TestContainers
- Code review assistance — ask Claude to check against the Implementation Checklist above

**CLAUDE.md setup for this stack:**

```markdown
# CLAUDE.md

## Stack
Java 21 · Spring Boot 3 · Spring Data JPA · Maven

## Project Structure
Layered architecture: controller → service (interface + impl) → repository → model (entity/dto/mapper)
Packages: config, controller/v1, model/entity, model/dto, model/mapper, repository, service, service/impl, exception, security, util

## Key Conventions
- PascalCase for classes, camelCase for methods/variables, UPPER_SNAKE_CASE for constants
- Suffix classes: UserRepository, UserService, UserController
- Use constructor injection only — never field injection (@Autowired on fields)
- Services are injected via their interface type, not the concrete impl

## What to follow
- Use @RequiredArgsConstructor (Lombok) for constructor injection
- Use Java Records for event payloads (Observer pattern)
- Use @TransactionalEventListener(phase = AFTER_COMMIT) for external side-effects
- Use Executors.newVirtualThreadPerTaskExecutor() for @Async task executors
- Use @Builder with @AllArgsConstructor(access = PRIVATE) for DTOs
- Always validate DTOs via ValidationUtils.validate() in the builder's build() method

## What to avoid
- Field injection with @Autowired
- @Transactional on read-only operations
- Slow I/O inside @Transactional methods
- Public setters on DTOs — use .toBuilder() instead
- Static factory methods that bypass the Spring Application Context
- Sharing a circuit breaker instance across different external APIs
```

**Guardrails:**
- Do not let Claude generate authentication, authorization, or cryptography code without manual review
- Always review AI-generated JPQL / native SQL queries before merging
- Do not share production secrets, PII, or proprietary data in prompts

---

### **Cursor**

**Recommended uses:**
- Inline generation of controller endpoints, service methods, and repository queries
- Refactoring field injection to constructor injection across the codebase
- Asking `@codebase` questions about service dependencies and data flow
- Generating parameterized JUnit 5 tests for boundary conditions

**`.cursor/rules` setup for this stack:**

```
## Role
You are a Java Spring Boot engineer working on an enterprise Spring Boot 3 / Java 21 project at Stratpoint.

## Standards to follow
- Always use constructor injection. Never use @Autowired on fields.
- Use @RequiredArgsConstructor (Lombok) to reduce boilerplate.
- Services must implement an interface; inject via the interface type.
- Use Java Records for event payloads. Use @Builder with private constructors for DTOs.
- Use @TransactionalEventListener(phase = AFTER_COMMIT) for external side-effects (email, SMS, webhooks).
- Use Executors.newVirtualThreadPerTaskExecutor() for all @Async task executors.
- Never place slow I/O inside a @Transactional method.

## Code style
- PascalCase for classes, camelCase for methods/variables, UPPER_SNAKE_CASE for constants
- Suffix: UserRepository, UserService, UserController, UserMapper
- Packages: controller/v1, service, service/impl, model/entity, model/dto, model/mapper, repository

## Always
- Write JUnit 5 tests alongside any new service or controller
- Validate DTOs using Bean Validation (JSR-380) + custom validators
- Use structured logging (SLF4J + Logback JSON) with correlation IDs

## Never
- Use field injection (@Autowired on private fields)
- Use @Transactional on read-only service methods
- Hardcode secrets or environment-specific values — use application profiles
- Skip input validation at controller or service entry points
```

**Guardrails:**
- Review all AI-suggested dependency additions in `pom.xml` before accepting
- Do not use AI-generated code in Spring Security configuration without a dedicated review pass
- Treat AI suggestions as a first draft — validate against the Implementation Checklist before merging

---

## **Implementation Checklist**

### **General**

* \[ \] Project structure setup  
* \[ \] Security configuration  
* \[ \] Error handling framework  
* \[ \] Database setup with migrations  
* \[ \] API documentation  
* \[ \] Unit and integration tests  
* \[ \] Logging configuration  
* \[ \] Monitoring setup  
* \[ \] CI/CD pipeline configuration  
* \[ \] Containerization setup  
* \[ \] Documentation  
* \[ \] Security scans implementation

### 

### **Dependency Injection**

**Goal:** Ensure loose coupling and testability through constructor-based orchestration.

* \[ \] **ENFORCE: Constructor Injection.** Mark all dependencies as `final` and use `@RequiredArgsConstructor` (Lombok) or a manual constructor.  
* \[ \] **FORBID: Field Injection.** Disallow `@Autowired` on private fields; it hides dependencies and breaks unit testing.  
* \[ \] **MANDATE: Interface-Based Lookups.** Services should be injected via their `interface` type, not the concrete `impl` class.

### 

### **Proxy Pattern**

**Goal:** Abstract cross-cutting concerns (Transactions, Async, Security) without polluting business logic.

* \[ \] **ENFORCE: Method Visibility.** Ensure intercepted methods are `public`. Proxies cannot intercept `private` or `protected` calls.  
* \[ \] **FORBID: Self-Invocation.** Ensure `@Transactional` or `@Async` methods are called from a *different* bean. Internal calls bypass the proxy.  
* \[ \] **MANDATE: Virtual Threads for `@Async`.** Configure the `TaskExecutor` to use `Executors.newVirtualThreadPerTaskExecutor()`.

### 

### **Factory pattern**

**Goal:** Centralize complex object creation while hiding implementation details from the caller.

* \[ \] **ENFORCE: Strategy Map.** Use a `Map<String, ServiceInterface>` injected via the constructor to replace `if/else` or `switch` blocks.  
* \[ \] **MANDATE: Bean Naming.** Ensure implementation beans are named consistently (e.g., `"PAYPAL_PAYMENT"`, `"STRIPE_PAYMENT"`) for factory lookup.  
* \[ \] **FORBID: Static Factories.** Avoid `static` factory methods that bypass the Spring Application Context; use a Spring-managed `@Component` Factory.

### 

### **Observer Pattern**

**Goal:** Maintain loose coupling between the primary "Unit of Work" and secondary "Side Effects."

* \[ \] **ENFORCE: Immutable Payloads.** Use **Java Records** for all event data to ensure thread safety across Virtual Threads.  
* \[ \] **MANDATE: Transactional Awareness.** Use `@TransactionalEventListener(phase = AFTER_COMMIT)` for external actions (Emails/SMS).  
* \[ \] **ENFORCE: Fallback Protection.** Ensure `fallbackExecution = false` for reliable observers to prevent "Ghost Notifications."

### 

### **Builder Pattern**

**Goal:** Facilitate the creation of valid, immutable-first DTOs with strict guardrails.

* \[ \] **ENFORCE: Private Constructors.** Set `@AllArgsConstructor(access = AccessLevel.PRIVATE)` to force the use of the `.builder()`.  
* \[ \] **MANDATE: Framework Access.** Set `@NoArgsConstructor(access = AccessLevel.PROTECTED)` to allow JPA/Jackson reflection.  
* \[ \] **ENFORCE: Self-Validation.** Override the `.build()` method to call a `ValidationUtils.validate(dto)` gate before returning the object.  
* \[ \] **FORBID: Public Setters.** Use `@Setter(AccessLevel.PROTECTED)` or avoid setters entirely in favor of `.toBuilder()`.

### **Circuit Breaker Pattern**

**Goal:** Prevent cascading failures and ensure system resilience through intelligent state-based traffic control.

* \[ \] **ENFORCE: Fallback Methods**. Every `@CircuitBreaker` must have a corresponding fallback to provide a graceful degradation (e.g., cached data, "Pending" status).  
* \[ \] **MANDATE: Exception Filtering**. Explicitly list which exceptions should ignore the breaker (e.g., `ValidationException`) vs. which should trip it (`TimeoutException`, `5xx Errors`).  
* \[ \] **FORBID: Shared Configurations for Different Risks**. Never use the same circuit breaker instance for two different external APIs (e.g., Stripe and FedEx). Each needs its own thresholds.  
* \[ \] **ENFORCE: Observability**. Ensure `registerHealthIndicator` is `true` so the breaker status is visible via `/actuator/health`.  
* \[ \] **AUDIT: Timeouts**. A circuit breaker is useless if the underlying call has no timeout. Always set `ConnectTimeout` and `ReadTimeout` on the client (RestTemplate/WebClient) first.  
* \[ \] **MANDATE: Virtual Thread Compatibility**. Ensure the fallback logic is non-blocking to prevent "Pinning" the underlying carrier threads.

---

## **References**

### **Official Documentation**

- [Spring Boot Reference Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Spring Framework Documentation](https://docs.spring.io/spring-framework/docs/current/reference/html/)
- [Spring Security Reference](https://docs.spring.io/spring-security/reference/)
- [Spring Data JPA Reference](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)
- [Java 21 Release Notes](https://openjdk.org/projects/jdk/21/)
- [Resilience4j Documentation](https://resilience4j.readme.io/docs)
- [Lombok Documentation](https://projectlombok.org/features/)
- [TestContainers for Java](https://java.testcontainers.org/)

### **Internal Resources**

- [Stratpoint Engineering Principles](/engineering-principles)
- [Backend Engineering Hub — Java Spring Boot Golden Path](/backend/golden-paths/java-springboot)
- [Backend Best Practices](/backend/best-practices)
- [Backend Code Review Checklist](/backend/code-review-checklist)

### **Further Reading**

- [Effective Java, 3rd Edition — Joshua Bloch](https://www.oreilly.com/library/view/effective-java/9780134686097/)
- [Spring Boot in Action — Craig Walls](https://www.manning.com/books/spring-boot-in-action)
- [Virtual Threads — Project Loom (JEP 444)](https://openjdk.org/jeps/444)
- [Structured Concurrency (JEP 453)](https://openjdk.org/jeps/453)
- [OWASP Java Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Java_Security_Cheat_Sheet.html)
