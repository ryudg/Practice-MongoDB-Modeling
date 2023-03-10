# Practice-MongoDB

> MongoDB Schema 설계

# Schema란?

> MongoDB에서 Schema는 데이터베이스에서 사용되는 문서의 구조를 정의하는 것
> Schema는 필드 이름, 타입, 기본값, 제약 조건 등을 정의하여 문서의 형식을 결정
> MongoDB는 Schemaless이므로, 각 문서는 자유롭게 필드를 추가하거나 제거할 수 있다.
> 각 문서의 구조를 일정하게 유지하고자 하는 경우에는 스키마를 사용할 수 있음

# MongoDB 데이터 관계 모델링

- MongoDB는 다큐먼트 기반 NoSQL 데이터베이스이며, 데이터 관계 모델링이란 MongoDB에서 데이터 간의 관계를 어떻게 표현할 것인지를 의미한다.
- 즉, 둘 이상의 문서 간의 관계를 모델링하는 것을 말한다.
- 이는 MongoDB의 도큐먼트 기반 구조에서 데이터를 구조화하고 연결하는 것이다.
- MongoDB에서 데이터 관계 모델링은 두 가지 기본 방식으로 구현될 수 있음
  - Embedded 방식
  - Referenced 방식

# 데이터의 관계 타입

> 데이터베이스에서 테이블간의 관계를 정의하는 것

## One-to-One 관계

- 한 문서에서 다른 한 문서와 1:1 관계를 가지는 경우이다.
- 예를 들어, 한 사용자에 대한 개인 정보 문서와 한 사용자가 소유한 계좌 정보 문서는 각각 다른 문서이지만 각각 한 사용자에 대한 것이다.

## One-to-Many 관계

- 한 문서에서 다른 다수의 문서와 1:N 관계를 가지는 경우이다.
- 예를 들어, 한 저자에 대한 정보 문서와 그 저자가 작성한 다수의 책 문서는 각각 다른 문서이지만 각각 한 저자에 대한 것이다.

## Many-to-Many 관계

- 두 개의 문서가 서로 다수의 문서와 N:M 관계를 가지는 경우이다.
- 예를 들어, 다수의 학생 문서와 다수의 강의 문서가 있을 때, 각 학생은 다수의 강의를 수강할 수 있으며, 각 강의는 다수의 학생이 수강할 수 있다.

# 데이터의 관계 타입을 구현하는 방법

> 데이터베이스에서 데이터 간의 연결 관계를 정의하고 구현하는 것을 말한다.
> 데이터의 정제와 정규화, 효율적인 데이터 관리를 위해 필요하다.
> 어떤 방식을 사용할지는 데이터의 종류, 용도, 사용자의 필요에 따라 결정되어야 한다.

## 관계 모델링 방식을 사용할때 고려해야 할 요소

1. 데이터 접근 패턴: 관련 문서의 데이터를 자주 접근해야 할 경우, Embedded 관계 모델링 방식을 사용하는 것이 효율적일 수 있다. <br>
   반대로, 관련 문서를 별도로 업데이트해야 할 경우 Referenced 관계 모델링 방식을 고려해야 할 수 있다.

2. 데이터 크기: 관련 문서가 작은 경우, 이들을 Embedded 문서로 저장하는 것이 편리하다. <br>
   관련 문서가 큰 경우, 이들을 별도의 문서로 저장하고 Referenced 관계를 사용하여 이들을 연결하는 것이 더 좋다.

3. 일관성: Embedded 관계 모델링은 단일 문서 내에서 트랜잭션 일관성을 유지할 수 있지만, Referenced 관계 모델링은 수동적인 일관성 관리가 필요하다.

4. 성능: Embedded 관계를 사용한 쿼리는 보통 빠르지만, 문서 크기가 커지면 느려질 수 있다. Referenced 관계는 쿼리에서 느릴 수 있지만, 문서 크기가 커지도 성능이 저하되지 않는다.

## Embedded

- 관계가 있는 두 문서를 하나의 문서에 임베딩하여 관계를 표현하는 방식
- Embedded는 관계가 있는 두 문서의 데이터를 하나의 문서에 저장하여 관계를 표현

## Referenced

- 관련된 데이터를 다른 문서에 참조하는 방식(관계가 있는 두 문서의 ObjectID를 가지고 관계를 표현)
- 참조 문서에서 관계가 있는 문서의 ObjectID를 저장하여 관계를 표현할 수 있으며, 관련 문서에 대한 정보를 가지고 있는 문서를 참조할 수 있다.

# MongoDB Schema Design의 기본 룰

> **정규화**(normalization)은 데이터베이스 구조를 최소한의 중복으로 만들어 데이터의 일관성과 안정성을 높이는 것을 목적으로 한다.
>
> - 정규화의 장점:
>   - 데이터 중복을 줄이고 불일치한 데이터를 제거한다.
>   - 데이터의 정질과 정확성을 향상시킨다.
>   - 데이터베이스의 확장성과 유지 관리성을 지원한다.
> - 정규화의 단점:
>   - 데이터베이스 구조와 쿼리의 복잡성이 증가한다.
>   - 여러 조인이 필요하여 쿼리 성능이 느려진다.
>   - 데이터 삽입, 업데이트, 삭제가 어려워진다.
>
> <br>
>
> **비정규화**(denormalization)은 정규화에서 제거된 데이터를 다시 테이블에 포함시켜 읽기 성능을 향상시키는 것을 목적으로 한다.
>
> - 비정규화의 장점:
>   - 조인의 수를 줄여 쿼리 성능을 향상시킨다.
>   - 데이터 조회를 더욱 간단하고 효율적으로 만든다.
>   - 데이터베이스 구조의 복잡성을 줄인다.
> - 비정규화의 단점:
>   - 데이터 중복이 증가하고 불일치하는 데이터의 위험성이 증가한다.
>   - 데이터 정확성과 일관성이 감소한다.
>   - 데이터를 업데이트하고 유지하는 것이 더욱 어렵다.
>
> <br>
> 따라서 정규화와 비정규화의 밸런스를 잘 잡아야 하며, 적절한 경우에는 정규화를, 읽기 성능이 중요한 경우에는 비정규화를 활용하는 것이 좋다.

<br>

## 읽기 성능을 향상시키기 위한 비정규화 데이터

- MongoDB는 읽기에 최적화되어 있어 데이터를 비정규화하면 쿼리 성능이 향상된다.

## 관련 데이터를 함께 저장하기

- 같은 문서나 embedded 문서에 관련 데이터를 저장하여 복잡한 조인을 피하기.

## 과도한 정규화 피하기

- 데이터를 너무 정규화하면 복잡하고 느려지는 쿼리가 발생할 수 있으므로, 정규화와 비정규화 사이의 균형을 유지.

## 적절한 데이터 타입 사용하기

- 각 필드에 적절한 데이터 타입을 선택하기. 예를 들어, 참조용으로는 ObjectId, 날짜용으로는 Date 등을 사용하여 최적의 성능과 기능을 보장하기.

## 성능 모니터링

- 데이터베이스의 성능을 정기적으로 모니터링하고 효율성을 향상하기 위한 변경사항을 적용.

## 사용 사례 고려

- 스키마를 설계할 때 애플리케이션의 특정 사용 사례와 요구 사항을 고려하고 필요에 맞는 모델링 방법을 선택하기.

### populate

- Mongoose의 `populate` 기능은 Mongoose model에서 관계형 데이터를 쉽게 관리할 수 있도록 하는(다른 문서(document)의 레퍼런스를 가져오는) 기능이다.
  - MongoDB에서는 다른 문서의 정보를 저장할 때 다른 문서의 \_id 값을 참조하는 방식을 사용한다.
  - 예를 들어, User 모델과 Post 모델이 있을 때, User 모델에는 Posts 필드가 있어 해당 User가 쓴 Post들을 참조할 수 있다.
  - 그러나, User 모델에서는 Posts 필드에 해당하는 Post 데이터의 상세 정보(예: Title, Body)를 얻을 수 없다.
  - 이 때, Mongoose의 `populate` 기능을 사용하면 User 모델에서 Posts 필드를 참조할 때, 해당 Posts의 상세 정보(Title, Body)를 같이 조회(다른 문서에서의 정보를 가져와 현재 문서에서 사용)할 수 있다.
  - 즉, User 모델과 Post 모델 간의 관계형 데이터를 쉽게 관리할 수 있게 된다.

```javascript
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], // products 필드가 MongoDB ObjectId의 배열이어야 함을 지정
  // type 속성은 Schema.Types.ObjectId로 설정되어 Mongoose에게이 필드가 MongoDB 문서의 고유 식별자를 저장할 것임을 알림.
  // ref 속성은 "Product"로 설정되어 ObjectId 값을 결정할 때 Mongoose가 Product 컬렉션을 참조하도록 지정
});

const PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);

// Find a user and populate their posts
User.findOne({ name: "John Doe" })
  .populate("posts")
  .exec((err, user) => {
    console.log(user);
  });
```

- 위 예시에서, User 모델과 Post 모델을 정의하고 User 모델에서 name이 'John Doe'인 User를 조회하는 코드를 보면,
- `User.findOne().populate('posts').exec()` 메서드를 통해 User를 조회할 때, Posts 필드에 해당하는 Post 데이터의 상세 정보(Title, Body)를 같이 조회할 수 있다.

> exec는 Mongoose의 Query 객체에서 사용되는 메서드이다. <br>
> exec 메서드는 MongoDB에서 데이터를 가져오고, 결과를 제공하는 비동기 함수를 실행하는 역할을 한다. <br>
> 위의 코드에서는 `User.findOne({ name: 'John Doe' }).populate('posts')`의 쿼리 결과를 비동기적으로 제공하는 exec 메서드를 사용하여, name이 'John Doe'인 User 객체를 가져오고 있다. <br>
> exec 메서드에서 사용되는 콜백 함수에서는 두 개의 인자가 제공 된다. <br>
>
> - 첫 번째 인자는 오류(error) 객체이고,
> - 두 번째 인자는 결과(result) 객체입니다. <br>
>   위의 코드에서는 결과 객체를 user라는 변수에 할당하고 있다.

> Query object는 MongoDB에서 데이터베이스에서 데이터를 조회, 수정, 삭제하는 데 사용되는 추상 객체다. <br>
> MongoDB의 모델 객체(Mongoose의 Model)로부터 생성된 쿼리 객체는 MongoDB 데이터베이스에 쿼리를 날릴 수 있도록 해준다. <br>
> 쿼리 객체는 많은 쿼리 메소드(ex: find, findOne, update, remove)를 포함하며, <br>
> 이 메소드를 사용하여 검색 조건, 업데이트, 삭제 등을 수행할 수 있다. exec 메소드는 쿼리 객체에서 쿼리를 실행하도록 지시하는 메소드다.

- 즉, User와 Post 간의 관계형 데이터를 쉽게 관리할 수 있게 된다.
- 위의 코드에서 console.log(user);의 값은 name이 'John Doe'인 User의 상세 정보를 포함한 객체이다.
- 만약 해당 User가 posts 필드에 연결된 Post 데이터가 있다면, posts 필드에 해당하는 Post 데이터의 상세 정보(Title, Body)도 같이 포함된다.
- 아래와 같은 결과

```javascript
{
  _id: 5f4f4c01aef37b38f861f492,
  name: 'John Doe',
  posts: [
    {
      _id: 5f4f4c01aef37b38f861f493,
      title: 'Hello World',
      body: 'This is a sample post',
      author: 5f4f4c01aef37b38f861f492,
      __v: 0
    },
    ...
  ],
  __v: 0
}
```
